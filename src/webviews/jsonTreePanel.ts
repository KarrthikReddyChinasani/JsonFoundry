// ✅ src/webviews/jsonTreePanel.ts
import * as vscode from "vscode";
import { getNonce } from "../utils";

export class JsonTreePanel {
  public static currentPanel: JsonTreePanel | undefined;
  private readonly panel: vscode.WebviewPanel;
  private readonly extensionUri: vscode.Uri;

  public static render(extensionUri: vscode.Uri) {
    if (this.currentPanel) {
      this.currentPanel.panel.reveal(vscode.ViewColumn.Beside);
    } else {
      this.currentPanel = new JsonTreePanel(extensionUri);
    }
  }

  private constructor(extensionUri: vscode.Uri) {
    this.extensionUri = extensionUri;

    this.panel = vscode.window.createWebviewPanel(
      "jsonTreeWebview",
      "JSON Tree View",
      vscode.ViewColumn.Beside,
      {
        enableScripts: true,
        localResourceRoots: [vscode.Uri.joinPath(extensionUri, "media")],
      }
    );

    this.panel.onDidDispose(() => {
      JsonTreePanel.currentPanel = undefined;
    });

    this.update();
  }

  private update() {
    const editor = vscode.window.activeTextEditor;
    let treeHtml = `<p>No active JSON file</p>`;
    if (editor) {
      try {
        const json = JSON.parse(editor.document.getText());
        treeHtml = this.renderNode("Root", json, "root");
      } catch (e) {
        treeHtml = `<p style="color:red;">Invalid JSON</p>`;
      }
    }

    const nonce = getNonce();
    const webview = this.panel.webview;
    const scriptUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this.extensionUri, "media", "jsonTree.js")
    );
    const styleUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this.extensionUri, "media", "jsonTree.css")
    );

    webview.html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource}; script-src 'nonce-${nonce}';">
        <link rel="stylesheet" href="${styleUri}" />
      </head>
      <body>
        <div class="tree-wrapper">${treeHtml}</div>
        <div id="popup">
          <h3><span></span> <button class="copy-btn">Copy Path</button></h3>
          <pre></pre>
        </div>
        <script nonce="${nonce}" src="${scriptUri}"></script>
      </body>
      </html>
    `;
  }

  private renderNode(label: string, value: any, path: string): string {
    const valueStr = JSON.stringify(value);

    if (typeof value !== "object" || value === null || Array.isArray(value)) {
      return `
      <div class="node-wrapper" data-node-path="${path}">
        <div class="node-box" data-path="${path}" data-value='${valueStr}'>${label}: ${valueStr}</div>
      </div>
    `;
    }

    const childrenHtml = Object.entries(value)
      .map(([key, val]) => {
        const childPath = `${path}.${key}`;
        return this.renderNode(key, val, childPath);
      })
      .join("");

    return `
    <div class="node-wrapper ${
      label === "Root" ? "root-wrapper" : ""
    } data-node-path="${path}">
      <div class="node-box" data-path="${path}" data-value='${valueStr}'>${label}</div>
      <div class="children">${childrenHtml}</div>
      <svg class="connector-svg"></svg>
    </div>
  `;
  }
}
