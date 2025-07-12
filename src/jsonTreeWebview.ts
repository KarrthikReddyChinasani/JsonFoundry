import * as vscode from "vscode";

export class JsonTreeWebviewProvider implements vscode.WebviewViewProvider {
  constructor(private readonly extensionUri: vscode.Uri) {}

  resolveWebviewView(webviewView: vscode.WebviewView): void {
    const editor = vscode.window.activeTextEditor;
    let json = {};
    try {
      json = editor ? JSON.parse(editor.document.getText()) : {};
    } catch {}

    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [this.extensionUri],
    };

    const styleUri = webviewView.webview.asWebviewUri(
      vscode.Uri.joinPath(this.extensionUri, "media", "style.css")
    );
    const scriptUri = webviewView.webview.asWebviewUri(
      vscode.Uri.joinPath(this.extensionUri, "media", "script.js")
    );

    webviewView.webview.html = this.getHtml(json, styleUri, scriptUri);
  }

  private getHtml(
    json: any,
    styleUri: vscode.Uri,
    scriptUri: vscode.Uri
  ): string {
    const tree = this.buildTree(json);
    return `<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="${styleUri}">
  </head>
  <body>
    <h3>JSON Tree</h3>
    <ul>${tree}</ul>
    <script src="${scriptUri}"></script>
  </body>
</html>`;
  }

  private buildTree(obj: any, path = "root"): string {
    if (typeof obj !== "object" || obj === null) return "";
    return Object.entries(obj)
      .map(([key, val]) => {
        const currentPath = `${path}.${key}`;
        if (typeof val === "object") {
          return `<li><div class="node" data-key="${key}" data-path="${currentPath}" data-value='${JSON.stringify(
            val
          )}'>${key}</div>
          <ul>${this.buildTree(val, currentPath)}</ul></li>`;
        } else {
          return `<li><div class="node" data-key="${key}" data-path="${currentPath}" data-value='${JSON.stringify(
            val
          )}'>${key}: ${val}</div></li>`;
        }
      })
      .join("");
  }
}
