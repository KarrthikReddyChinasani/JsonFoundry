import * as vscode from 'vscode';
import { JsonTreeWebviewProvider } from './jsonTreeWebview';
import { TsInterfaceWebviewProvider } from './tsInterfaceWebview';

export function activate(context: vscode.ExtensionContext) {
  const treeProvider = new JsonTreeWebviewProvider(context.extensionUri);
  const tsProvider = new TsInterfaceWebviewProvider(context.extensionUri);

  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider('jsonTreeWebview', treeProvider),
    vscode.window.registerWebviewViewProvider('tsInterfaceWebview', tsProvider),

    vscode.commands.registerCommand('jsonTools.viewTree', () => {
      vscode.commands.executeCommand('workbench.view.panel.jsonTreeWebview');
    }),

    vscode.commands.registerCommand('jsonTools.viewTS', () => {
      vscode.commands.executeCommand('workbench.view.panel.tsInterfaceWebview');
    })
  );
}

export function deactivate() {}