import * as vscode from 'vscode'
import { effectScope, useDisposable } from 'reactive-vscode'

export function useCustomTextEditor(
  viewType: string,
  fn: (document: vscode.TextDocument, webviewPanel: vscode.WebviewPanel) => void,
) {
  useDisposable(
    vscode.window.registerCustomEditorProvider(
      viewType,
      {
        resolveCustomTextEditor(
          document: vscode.TextDocument,
          webviewPanel: vscode.WebviewPanel,
          _token: vscode.CancellationToken,
        ) {
          const scope = effectScope(true)
          webviewPanel.onDidDispose(() => {
            scope.stop()
          })

          scope.run(() => fn(document, webviewPanel))
        },
      },
      {
        supportsMultipleEditorsPerDocument: true,
      },
    ),
  )
}
