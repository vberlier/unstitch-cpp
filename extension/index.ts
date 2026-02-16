import * as vscode from 'vscode'
import { defineExtension, onScopeDispose, useDisposable } from 'reactive-vscode'
import { Parser, Language, Tree, Edit, Query, Point } from 'web-tree-sitter'

import { getWebviewHtml } from 'virtual:vscode'
import { useCustomTextEditor } from './composables/useCustomTextEditor'
import { buildProjection, Declaration, Reference, Stitch } from './projection'
import { QUERY } from './query'

function asRowColumn({ line, character }: vscode.Position) {
  return { row: line, column: character }
}

function asPosition({ row, column }: Point) {
  return new vscode.Position(row, column)
}

let parserInitialized = false

const { activate, deactivate } = defineExtension((context) => {
  useCustomTextEditor('unstitch-cpp.editor', async (document, webviewPanel) => {
    webviewPanel.webview.options = {
      enableScripts: true,
    }
    webviewPanel.webview.html = getWebviewHtml({
      serverUrl: process.env.VITE_DEV_SERVER_URL,
      webview: webviewPanel.webview,
      context,
    })

    function send(message: ExtensionMessage) {
      webviewPanel.webview.postMessage(message)
    }

    let parser: Parser | null = null
    let query: Query | null = null
    let tree: Tree | null = null
    onScopeDispose(() => {
      parser?.delete()
      query?.delete()
      tree?.delete()
    })

    let stitchIndex = new Map<string, Stitch[]>()
    let graphNodes: Record<string, GraphNode> = {}
    let graphLinks: Record<string, GraphLink> = {}

    init()

    async function init() {
      if (!parserInitialized) {
        const parserPath = vscode.Uri.joinPath(context.extensionUri, 'web-tree-sitter.wasm').fsPath
        await Parser.init({ locateFile: () => parserPath })
        parserInitialized = true
      }

      const languagePath = vscode.Uri.joinPath(context.extensionUri, 'tree-sitter-cpp.wasm').fsPath
      const language = await Language.load(languagePath)

      parser = new Parser()
      parser.setLanguage(language)

      query = new Query(language, QUERY)

      updateWebview()
    }

    function updateWebview() {
      const oldTree = tree
      tree = parser?.parse(document.getText(), oldTree) ?? null
      oldTree?.delete()

      if (tree && query) {
        const projection = buildProjection(tree.rootNode, query.captures(tree.rootNode))
        stitchIndex = projection.stitchIndex
        graphNodes = Object.fromEntries(projection.graphNodes.entries())
        graphLinks = Object.fromEntries(projection.graphLinks.entries())
      }

      send({ type: 'update', graphNodes, graphLinks })
    }

    function updateGraphNodeCoordinates(key: string, [x, y]: [number, number]) {
      const edit = new vscode.WorkspaceEdit()

      for (const { item, label } of stitchIndex.get(key) ?? []) {
        let newStitch = `//// ${x} ${y}`
        if (label) {
          newStitch += ` ${label}`
        }
        edit.replace(
          document.uri,
          new vscode.Range(asPosition(item.node.startPosition), asPosition(item.node.endPosition)),
          newStitch,
        )
      }

      vscode.workspace.applyEdit(edit)
    }

    function removeConnection(
      edit: vscode.WorkspaceEdit,
      originKey: string,
      identifier: string | undefined,
      targetKey: string,
      n: number,
    ) {
      for (const { inner } of stitchIndex.get(originKey) ?? []) {
        const declaration = inner.filter(
          (i) => i.type === 'declaration' && i.identifier === identifier,
        )[0] as Declaration
        if (declaration) {
          const reference = declaration.references.filter(
            (r) =>
              r.stitch?.key === targetKey ||
              (!r.stitch?.coordinates &&
                (r.stitch?.predecessor?.key === targetKey || r.stitch?.outer?.key === targetKey)),
          )[n]
          replaceWithDefault(edit, reference)
          break
        }
      }
    }

    function replaceWithDefault(edit: vscode.WorkspaceEdit, reference: Reference) {
      const declaration = reference.declaration!
      const declarationStatement = declaration.item.parent!
      const declarationType = declarationStatement.node.text.slice(
        0,
        declaration.item.node.startIndex - declarationStatement.node.startIndex,
      )

      let i = 0
      while (reference.scope[`placeholder_${i}LinkDefault`]) {
        i++
      }

      const statement = reference.item.parent!
      const toReplace = statement.node.text
      const result = `${declarationType}placeholder_${i}LinkDefault;\n${' '.repeat(statement.node.startPosition.column)}${toReplace.slice(0, reference.item.node.startIndex - statement.node.startIndex)}placeholder_${i}LinkDefault${toReplace.substring(reference.item.node.endIndex - statement.node.startIndex)}`
      edit.replace(
        document.uri,
        new vscode.Range(
          asPosition(statement.node.startPosition),
          asPosition(statement.node.endPosition),
        ),
        result,
      )
    }

    useDisposable(
      webviewPanel.onDidChangeViewState(() => {
        if (webviewPanel.visible) {
          updateWebview()
        }
      }),
    )

    useDisposable(
      vscode.workspace.onDidChangeTextDocument((event) => {
        if (event.document.uri.toString() === document.uri.toString()) {
          for (const { range, rangeOffset, rangeLength, text } of event.contentChanges) {
            const startIndex = rangeOffset
            const oldEndIndex = rangeOffset + rangeLength
            const newEndIndex = rangeOffset + text.length
            const newEndPosition = document.positionAt(newEndIndex)
            tree?.edit(
              new Edit({
                startIndex,
                oldEndIndex,
                newEndIndex,
                startPosition: asRowColumn(range.start),
                oldEndPosition: asRowColumn(range.end),
                newEndPosition: asRowColumn(newEndPosition),
              }),
            )
          }
          updateWebview()
        }
      }),
    )

    useDisposable(
      webviewPanel.webview.onDidReceiveMessage((data) => {
        const message = data as WebviewMessage
        switch (message.type) {
          case 'ready':
            updateWebview()
            break
          case 'move':
            updateGraphNodeCoordinates(message.graphNodeKey, message.newCoordinates)
            break
          case 'connect:data':
          case 'connect:execution':
            const edit = new vscode.WorkspaceEdit()

            const originNode = graphNodes[message.fromGraphNodeKey]
            const originSide =
              message.type === 'connect:data' ? originNode.outputs : originNode.inputs
            const originPort = originSide[message.fromPortIndex]
            const identifier = originPort.link?.split('&')[1]

            if (message.replaceGraphNodeKey && message.replacePortIndex !== undefined) {
              const graphNode = graphNodes[message.replaceGraphNodeKey]
              const side = message.type === 'connect:data' ? graphNode.inputs : graphNode.outputs
              let n = 0
              for (let i = 0; i < message.replacePortIndex; i++) {
                if (side[i].link === originPort.link) {
                  n++
                }
              }
              removeConnection(
                edit,
                message.fromGraphNodeKey,
                identifier,
                message.replaceGraphNodeKey,
                n,
              )
            }

            if (message.toGraphNodeKey && message.toPortIndex !== undefined) {
              const graphNode = graphNodes[message.toGraphNodeKey]
              const side = message.type === 'connect:data' ? graphNode.inputs : graphNode.outputs
              const port = side[message.toPortIndex]
              if (port.link) {
                const [originKey, identifier] = port.link.split('&')
                let n = 0
                for (let i = 0; i < message.toPortIndex; i++) {
                  if (side[i].link === port.link) {
                    n++
                  }
                }
                removeConnection(edit, originKey, identifier, message.toGraphNodeKey, n)
              }
            }

            vscode.workspace.applyEdit(edit)
            break
        }
      }),
    )
  })
})

export { activate, deactivate }
