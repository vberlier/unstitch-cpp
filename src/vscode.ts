/// <reference types="@types/vscode-webview" />

interface WebviewState {
  scale: number
  translateX: number
  translateY: number
}

export const webviewApi = acquireVsCodeApi<WebviewState>()

export function send(message: WebviewMessage) {
  webviewApi.postMessage(message)
}
