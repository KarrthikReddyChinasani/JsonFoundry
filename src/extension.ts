import * as vscode from "vscode";
import { generateInterfaceFromJson } from "./tsGenerator";
import { JsonTreePanel } from "./webviews/jsonTreePanel";

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand("jsonTools.viewTree", () => {
      JsonTreePanel.render(context.extensionUri);
    }),

    vscode.commands.registerCommand("jsonTools.viewTS", async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) return;

      try {
        const json = JSON.parse(editor.document.getText());
        const ts = generateInterfaceFromJson(json, "RootObject");
        const doc = await vscode.workspace.openTextDocument({
          language: "typescript",
          content: ts,
        });
        vscode.window.showTextDocument(doc, { preview: false });
      } catch (e) {
        vscode.window.showErrorMessage(`Invalid JSON: ${e}`);
      }
    })
  );
}

export function deactivate() {}
