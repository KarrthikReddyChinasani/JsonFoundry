import * as vscode from "vscode";
import { generateInterfaceFromJson } from "./tsGenerator";

export class TsInterfaceWebviewProvider implements vscode.WebviewViewProvider {
  constructor(private readonly extensionUri: vscode.Uri) {}

  resolveWebviewView(webviewView: vscode.WebviewView): void {
    const editor = vscode.window.activeTextEditor;
    let json = {};
    let tsOutput = "";

    try {
      json = editor ? JSON.parse(editor.document.getText()) : {};
      tsOutput = generateInterfaceFromJson(json, "RootObject");
    } catch (e) {
      tsOutput = "// Invalid JSON";
    }

    const styleUri = webviewView.webview.asWebviewUri(
      vscode.Uri.joinPath(this.extensionUri, "media", "style.css")
    );
    const scriptUri = webviewView.webview.asWebviewUri(
      vscode.Uri.joinPath(this.extensionUri, "media", "script.js")
    );

    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [this.extensionUri],
    };

    webviewView.webview.html = `<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="${styleUri}">
  </head>
  <body>
    <h3>TypeScript Interface</h3>
    <button id="copyTs">📋 Copy</button>
    <button id="downloadTs">💾 Download</button>
    <pre id="tsOutput"><code>${tsOutput}</code></pre>
    <script src="${scriptUri}"></script>
  </body>
</html>`;
  }
}
