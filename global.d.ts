interface GraphNodePort {
  type: 'data' | 'execution'
  name?: string
  tag?: string
  link?: string
  default?: string
}

interface GraphNode {
  key: string
  coordinates?: [number, number]
  title?: string
  inputs: GraphNodePort[]
  outputs: GraphNodePort[]
}

interface GraphNodePortLocation {
  coordinates: [number, number]
  index: number
}

interface GraphLink {
  type: 'data' | 'execution'
  origin: GraphNodePortLocation
  targets: GraphNodePortLocation[]
}

type WebviewMessage = {
  type: 'ready'
}

type ExtensionMessage = {
  type: 'update'
  graphNodes: Record<string, GraphNode>
  graphLinks: Record<string, GraphLink>
}
