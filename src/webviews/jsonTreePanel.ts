import * as vscode from "vscode";
import { getNonce } from "../utils";
import { getIconEmoji } from "./getIconEmoji";
import { getType } from "./getType";
import LEGEND from "./legend";

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
        treeHtml = this.renderNode("Root", json, "Root");
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

    webview.html =
      `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource}; script-src 'nonce-${nonce}';">
        <link rel="stylesheet" href="${styleUri}" />
      </head>
      <body>` +
      LEGEND +
      `<div class="tree-wrapper">${treeHtml}</div>
        <div id="popup">
          <h3><span></span>
            <div>
              <button class="copy-btn">Copy Path</button>
              <button class="close-btn">x</button>
            </div>
          </h3>
          <pre></pre>
        </div>
        <script nonce="${nonce}" src="${scriptUri}"></script>
      </body>
      </html>
    `;
  }

  private renderNode(label: string, value: any, path: string): string {
    const type = getType(value);
    const icon = getIconEmoji(type);
    // ✅ Function node
    if (typeof value === "function") {
      const funcStr = value.toString();
      return `
        <div class="node-wrapper">
          <svg class="connector-svg"></svg>
          <div class="node-box" data-path="${path}" 
              data-value='${JSON.stringify(funcStr)}'>
              <span class="node-icon">${getIconEmoji(
                "unknown"
              )}</span>${label}: [Function]
          </div>
        </div>
      `;
    }

    // ✅ Primitive value
    if (typeof value !== "object" || value === null) {
      return `
        <div class="node-wrapper">
          <svg class="connector-svg"></svg>
          <div class="node-box" data-path="${path}" 
          data-value='${JSON.stringify(value)}'>
             <span class="node-icon">${icon}</span>
             ${label}: ${JSON.stringify(value)}
          </div>
        </div>
      `;
    }

    // ✅ Array value
    if (Array.isArray(value)) {
      const children = value
        .map((item, index) => {
          const childPath = `${path}[${index}]`;
          return this.renderNode(`${label}[${index}]`, item, childPath);
        })
        .join("");

      return `
        <div class="node-wrapper">
          <svg class="connector-svg"></svg>
          <div class="node-box" data-path="${path}" 
          data-value='${JSON.stringify(value)}'>
            <span class="node-icon">📚</span>
            ${label}
          </div>
          <div class="children">${children}</div>
        </div>
      `;
    }

    // ✅ Object value
    const children = Object.entries(value)
      .map(([key, val]) => {
        const childPath = `${path}.${key}`;
        return this.renderNode(key, val, childPath);
      })
      .join("");

    return `
      <div class="node-wrapper">
        <svg class="connector-svg"></svg>
        <div class="node-box" data-path="${path}" 
        data-value='${JSON.stringify(value)}'>
          <span class="node-icon">🗂️</span>
          ${label}
        </div>
        <div class="children">${children}</div>
      </div>
    `;
  }
}
