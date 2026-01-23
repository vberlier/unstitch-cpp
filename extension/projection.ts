import type { QueryCapture, Node } from 'web-tree-sitter'

interface Outline {
  tag: string
  node: Node
  index: number
  parent?: Outline
  children: Outline[]
}

function buildOutline(root: Node, captures: QueryCapture[]) {
  const outline: Outline = { tag: 'root', node: root, index: root.startIndex, children: [] }
  const stack = [outline]

  for (const { name: tag, node } of captures) {
    while (stack.at(-1)!.node.endIndex < node.endIndex) {
      stack.pop()
    }

    const item = { tag, node, index: node.startIndex, parent: stack.at(-1)!, children: [] }
    item.parent.children.push(item)
    stack.push(item)
  }

  return outline
}

interface Reference {
  type: 'reference'
  item: Outline
  stitch?: Stitch
  declaration?: Declaration
}

interface Declaration {
  type: 'declaration'
  item: Outline
  stitch?: Stitch
  identifier: string
  unmangled: {
    name: string
    n: number
    tag: string
  }
  references: Reference[]
}

interface Stitch {
  type: 'stitch'
  item: Outline
  key: string
  coordinates?: [number, number]
  label?: string
  startIndex: number
  endIndex: number
  outer?: Stitch
  inner: (Stitch | Declaration | Reference)[]
  predecessor?: Stitch
  successor?: Stitch
}

function resolveOutline(
  outline: Outline,
  declarations: Map<number, Declaration>,
  references: Map<number, number>,
  stitches: Stitch[],
  scope: Record<string, number> = {},
  outerStitch?: Stitch,
) {
  scope = { ...scope }

  const scopeItems = outline.children.flatMap((item) =>
    item.tag === 'function' && item.children[0].tag === 'declaration'
      ? [item.children[0]]
      : item.tag === 'parameters'
        ? item.parent?.tag === 'function'
          ? item.children
          : []
        : [item],
  )

  if (outline.tag === 'function') {
    scopeItems.shift()
  }

  for (const item of scopeItems) {
    if (item.tag === 'declaration') {
      const identifier = item.node.text
      const [name, n, tag] = unmangle(identifier)
      const resolved: Declaration = {
        type: 'declaration',
        item,
        identifier,
        unmangled: { name, n, tag },
        references: [],
      }
      scope[resolved.identifier] = item.index
      declarations.set(item.index, resolved)
    }
  }

  let currentStitch = outerStitch

  for (const item of scopeItems) {
    if (item.tag === 'declaration') {
      const resolved = declarations.get(item.index)!
      resolved.stitch = currentStitch
      currentStitch?.inner.push(resolved)
      if (item.parent?.tag === 'function' && item === item.parent.children[0]) {
        resolveOutline(item.parent, declarations, references, stitches, scope, currentStitch)
      }
    } else if (item.tag === 'reference') {
      const index = scope[item.node.text]
      if (index !== undefined) {
        const resolved: Reference = { type: 'reference', item }
        resolved.declaration = declarations.get(index)!
        resolved.declaration.references.push(resolved)
        references.set(item.index, index)
        resolved.stitch = currentStitch
        currentStitch?.inner.push(resolved)
      }
    } else if (item.tag === 'stitch') {
      const stitch: Stitch = {
        type: 'stitch',
        item,
        key: `hidden ${item.index}`,
        startIndex: item.index,
        endIndex: item.index,
        outer: outerStitch,
        inner: [],
      }
      const annotation = item.node.text
      let m = annotation.match(/(-?\d+)\s+(-?\d+)(.*)$/)
      if (m) {
        const [_, x, y, label] = m
        stitch.coordinates = [parseInt(x), parseInt(y)]
        stitch.label = label.trim() || undefined
        stitch.key = stitch.coordinates.join(' ')
      } else {
        m = annotation.match(/(\w.*)$/)
        stitch.label = (m && m[0].trim()) || undefined
      }
      if (!currentStitch) {
        stitches.push(stitch)
      } else if (currentStitch === outerStitch) {
        outerStitch.inner.push(stitch)
      } else {
        currentStitch.endIndex = stitch.startIndex
        currentStitch.successor = stitch
        stitch.predecessor = currentStitch
      }
      currentStitch = stitch
    } else {
      resolveOutline(item, declarations, references, stitches, scope, currentStitch)
    }
  }

  if (currentStitch && currentStitch !== outerStitch) {
    currentStitch.endIndex = outline.node.lastNamedChild!.endIndex
  }
}

function getDeclarationInitValue(declaratorNode: Node) {
  let node = declaratorNode.parent
  while (['pointer_declarator', 'reference_declarator'].includes(node?.type ?? '')) {
    node = node?.parent ?? null
  }
  if (node?.type === 'init_declarator') {
    return node.childForFieldName('value')
  }
}

function getLastExecutionOutput(graphNode: GraphNode) {
  return graphNode.outputs.reduce<GraphNodePort | undefined>(
    (previous, output) => (output.type === 'execution' ? output : previous),
    undefined,
  )
}

function buildGraph(graphNodes: Map<string, GraphNode>, stitch: Stitch): GraphNode {
  let graphNode = graphNodes.get(stitch.key)

  if (!graphNode) {
    graphNode = { key: stitch.key, coordinates: stitch.coordinates, inputs: [], outputs: [] }
    graphNodes.set(stitch.key, graphNode)
  }

  if (!graphNode.title && stitch.label) {
    graphNode.title = stitch.label
  }

  for (let i = 0; i < stitch.inner.length; i++) {
    const thing = stitch.inner[i]
    switch (thing.type) {
      case 'declaration':
        if (thing.unmangled.tag === 'Internal') {
          break
        }

        if (thing.unmangled.tag === 'Input') {
          const initValue = getDeclarationInitValue(thing.item.node)

          const nextThing = stitch.inner[i + 1]
          if (
            initValue &&
            nextThing?.type === 'reference' &&
            nextThing.declaration &&
            nextThing.declaration.stitch &&
            nextThing.declaration.stitch !== stitch &&
            nextThing.declaration.unmangled.tag !== 'Internal' &&
            nextThing.item.node.equals(initValue)
          ) {
            graphNode.inputs.push({
              type: 'data',
              name: thing.unmangled.name,
              tag: thing.unmangled.tag,
              link: `${nextThing.declaration.stitch.key} ${nextThing.declaration.identifier}`,
            })
            i++
            break
          }

          graphNode.inputs.push({
            type: 'data',
            name: thing.unmangled.name,
            tag: thing.unmangled.tag,
            default: initValue?.text,
          })
          break
        }

        if (!graphNode.title) {
          if (thing.item.parent?.tag === 'function') {
            const definition = thing.item.parent.node
            const text = definition.text.substring(
              0,
              definition.childForFieldName('body')!.startIndex - definition.startIndex,
            )
            graphNode.title = sloppyUnmangle(text.trim())
          } else {
            const text = getDeclarationInitValue(thing.item.node)?.text
            if (text) {
              graphNode.title = sloppyUnmangle(text)
            }
          }
        }

        if (thing.item.parent?.tag === 'function') {
          graphNode.inputs.push({
            type: 'execution',
            name: thing.unmangled.name,
            tag: thing.unmangled.tag,
            link: `${stitch.key} ${thing.identifier}`,
          })
        } else {
          graphNode.outputs.push({
            type: 'data',
            name: thing.unmangled.name,
            tag: thing.unmangled.tag,
            link: `${stitch.key} ${thing.identifier}`,
          })
        }
        break

      case 'reference':
        if (
          !thing.declaration ||
          !thing.declaration.stitch ||
          thing.declaration.stitch === stitch ||
          thing.declaration.unmangled.tag === 'Internal'
        ) {
          break
        }
        if (thing.declaration.item.parent?.tag === 'function') {
          graphNode.outputs.push({
            type: 'execution',
            tag: thing.declaration.unmangled.tag,
            link: `${thing.declaration.stitch.key} ${thing.declaration.identifier}`,
          })
        } else {
          graphNode.inputs.push({
            type: 'data',
            name: thing.declaration.unmangled.name,
            tag: thing.declaration.unmangled.tag,
            link: `${thing.declaration.stitch.key} ${thing.declaration.identifier}`,
          })
        }
        break

      case 'stitch':
        const targetNode = buildGraph(graphNodes, thing)

        if (!targetNode.coordinates) {
          const lastExecutionOutput = getLastExecutionOutput(targetNode)
          graphNode.outputs.push({
            type: 'execution',
            name: targetNode.title,
            link: lastExecutionOutput?.link,
          })
        } else {
          graphNode.outputs.push({
            type: 'execution',
            link: targetNode.key,
          })
          targetNode.inputs.push({
            type: 'execution',
            link: targetNode.key,
          })
        }
        break
    }
  }

  if (stitch.successor) {
    const targetNode = buildGraph(graphNodes, stitch.successor)

    if (stitch.outer) {
      let pure = false
      for (const output of graphNode.outputs) {
        if (output.type === 'data' && output.tag === 'Pure') {
          pure = true
          break
        }
      }

      if (pure) {
        return targetNode
      }

      if (!targetNode.coordinates) {
        const lastExecutionOutput = getLastExecutionOutput(targetNode)
        graphNode.outputs.push({
          type: 'execution',
          name: targetNode.title,
          link: lastExecutionOutput?.link,
        })
      } else {
        graphNode.outputs.push({
          type: 'execution',
          link: targetNode.key,
        })
        targetNode.inputs.push({
          type: 'execution',
          link: targetNode.key,
        })
      }
    }
  }

  return graphNode
}

function cleanGraph(graphNodes: Map<string, GraphNode>) {
  const remap = new Map<string, string>()
  const hidden: string[] = []

  for (const graphNode of graphNodes.values()) {
    if (!graphNode.coordinates) {
      hidden.push(graphNode.key)
      for (const input of graphNode.inputs) {
        if (input.type === 'execution' && input.link) {
          const target = graphNode.outputs.filter((output) => output.type === 'execution')[0]
          if (target?.link) {
            remap.set(input.link, target.link)
          }
          break
        }
      }
    }
  }

  for (const key of hidden) {
    graphNodes.delete(key)
  }

  for (const graphNode of graphNodes.values()) {
    for (const output of graphNode.outputs) {
      if (output.type === 'execution' && output.link && remap.has(output.link)) {
        output.link = remap.get(output.link)
      }
    }
  }
}

function buildLinks(graphLinks: Map<string, GraphLink>, graphNodes: Map<string, GraphNode>) {
  for (const graphNode of graphNodes.values()) {
    if (graphNode.coordinates) {
      for (let i = 0; i < graphNode.inputs.length; i++) {
        const input = graphNode.inputs[i]
        if (input.type === 'execution' && input.link) {
          graphLinks.set(input.link, {
            type: input.type,
            origin: { coordinates: graphNode.coordinates, index: i },
            targets: [],
          })
        }
      }
      for (let i = 0; i < graphNode.outputs.length; i++) {
        const output = graphNode.outputs[i]
        if (output.type === 'data' && output.link) {
          graphLinks.set(output.link, {
            type: output.type,
            origin: { coordinates: graphNode.coordinates, index: i },
            targets: [],
          })
        }
      }
    }
  }
  for (const graphNode of graphNodes.values()) {
    if (graphNode.coordinates) {
      for (let i = 0; i < graphNode.inputs.length; i++) {
        const input = graphNode.inputs[i]
        if (input.type === 'data' && input.link) {
          graphLinks.get(input.link)?.targets.push({ coordinates: graphNode.coordinates, index: i })
        }
      }
      for (let i = 0; i < graphNode.outputs.length; i++) {
        const output = graphNode.outputs[i]
        if (output.type === 'execution' && output.link) {
          graphLinks
            .get(output.link)
            ?.targets.push({ coordinates: graphNode.coordinates, index: i })
        }
      }
    }
  }
}

export function buildProjection(root: Node, captures: QueryCapture[]) {
  const outline = buildOutline(root, captures)

  const declarations = new Map<number, Declaration>()
  const references = new Map<number, number>()
  const stitches: Stitch[] = []
  resolveOutline(outline, declarations, references, stitches)

  const graphNodes = new Map<string, GraphNode>()
  for (const stitch of stitches) {
    buildGraph(graphNodes, stitch)
  }

  cleanGraph(graphNodes)

  const graphLinks = new Map<string, GraphLink>()
  buildLinks(graphLinks, graphNodes)

  return { declarations, references, stitches, outline, graphNodes, graphLinks }
}

function mangle(name: string, n: number, tag: string) {
  if (n >= 0) {
    return `${name}_${n}${tag}`
  }
  return name
}

function unmangle(name: string): [string, number, string] {
  const m = name.match(/^(\w+)_(\d+)([a-zA-Z]*)$/)
  if (m) {
    const [_, stripped, n, tag] = m
    return [stripped, parseInt(n), tag]
  }
  return [name, -1, '']
}

function sloppyUnmangle(text: string) {
  return text.replaceAll(/\b(\w+)_(\d+)([a-zA-Z]*)\b/g, '$1')
}
