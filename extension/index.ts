import * as vscode from 'vscode'
import { defineExtension, onScopeDispose, useDisposable } from 'reactive-vscode'
import { Parser, Language, Tree, Edit, Query, Point } from 'web-tree-sitter'

import { getWebviewHtml } from 'virtual:vscode'
import { useCustomTextEditor } from './composables/useCustomTextEditor'
import { buildProjection, Stitch } from './projection'
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

      let graphNodes: Record<string, GraphNode> = {}
      let graphLinks: Record<string, GraphLink> = {}

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
            console.log(message)
            break
        }
      }),
    )
  })
})

export { activate, deactivate }
