/// <reference types="@types/vscode-webview" />

export interface ViewportState {
  scale: number
  translateX: number
  translateY: number
}

export const webviewApi = acquireVsCodeApi<ViewportState>()

export function send(message: WebviewMessage) {
  webviewApi.postMessage(message)
}
