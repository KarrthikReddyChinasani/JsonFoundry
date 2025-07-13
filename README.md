# 🔥 JSON Foundry

[![VS Code Marketplace](https://img.shields.io/visual-studio-marketplace/v/karthikchinasani.json-foundry?color=blue&label=VS%20Code%20Marketplace)](https://marketplace.visualstudio.com/items?itemName=karthikchinasani.json-foundry)
[![Installs](https://img.shields.io/visual-studio-marketplace/i/karthikchinasani.json-foundry?label=Installs)](https://marketplace.visualstudio.com/items?itemName=karthikchinasani.json-foundry)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![GitHub](https://img.shields.io/badge/GitHub-KarrthikReddyChinasani%2FJsonFoundry-blue?logo=github)](https://github.com/KarrthikReddyChinasani/JsonFoundry)


**Visualize JSON as an interactive mind map + generate fully typed TypeScript interfaces.**  
Built for developers who work with APIs, data contracts, and schema design.

![JSON Foundry Demo](demo.gif)

---

## 📦 Extension Info

- **Name:** JSON Foundry
- **Command Prefix:** `jsonTools`
- **Publisher:** `karthik.json-foundry`
- **Version:** `1.0.0`
- **VS Code Compatibility:** `^1.85.0`

---

## ✨ Features

- 🔍 **View JSON as a Tree**  
  Opens any JSON file in a beautiful mind-map layout with parent–child lines and hierarchy.

- 🧠 **Generate TypeScript Interface**  
  Extracts a complete `.ts` interface from any JSON document, with nested type support.

- 🖱️ **Hover + Click Interactions**  
  - Hover nodes to see their path  
  - Click to open a syntax-colored popup with key/value pairs and a “Copy path” button

- 📚 **Handles Arrays**  
  Array items are visualized as separate child nodes (e.g., `items[0]`, `items[1]`)

- 📦 **Node Icons**  
  - 📦 Object  
  - 📚 Array  
  - 📄 Primitive

- 🔄 **Expand/Collapse Support**  
  Each object/array node can be collapsed or expanded with a + / − button

- 🌈 **Modern UI**  
  Curved connectors, hover tooltips, smooth scrollbars, and a popup code viewer

---

## 🧪 How to Use

1. **Open a `.json` file**
2. Click either:
   - 🔲 `View JSON Tree` → Opens the tree in a file-like tab
   - 🧬 `Generate TypeScript Interface` → Opens `.ts` output in a new tab

You can also right-click the tab title bar and run either command directly.

---

## 🛠️ Commands

| Command ID               | Action                         |
|--------------------------|--------------------------------|
| `jsonTools.viewTree`     | Open tree view of current JSON |
| `jsonTools.viewTS`       | Generate TS interface for JSON |

---

## 🧳 Installation

### ▶️ From Marketplace

Coming soon...

### 💻 Manual (VSIX)

```bash
npm install -g @vscode/vsce
vsce package
code --install-extension json-foundry-1.0.0.vsix
```

## 🧱 Project Structure

| Folder / File            | Purpose                                  |
|--------------------------|------------------------------------------|
| `src/`                   | TypeScript source files for extension    |
| `out/`                   | Compiled JS output (from `tsc`)          |
| `webviews/`              | HTML, CSS, JS for WebView UIs            |
| `media/` *(optional)*    | Static assets like icons or images       |
| `package.json`           | Extension metadata and contributions     |
| `README.md`              | Project documentation                    |
| `tsconfig.json`          | TypeScript configuration                 |
| `.vscodeignore` *(opt)*  | Exclude dev files from packaged `.vsix`  |


## 💡 Dev Tips

To develop locally:

```bash
npm install       # Install dependencies
npm run build     # Compile TypeScript
code .            # Open VS Code
```

Press F5 to launch Extension Development Host


---

### 📄 License

```markdown
## 📄 License
```
MIT © Karthik

This extension is free to use and modify. See `LICENSE` for full terms.


## 🙌 Support

If you enjoy this tool:

- 🌟 [Star the repo](https://github.com/KarrthikReddyChinasani/JsonFoundry)
- 🐞 [Report bugs or suggest features](https://github.com/KarrthikReddyChinasani/JsonFoundry/issues)
- 🔁 [Contribute via pull requests](https://github.com/KarrthikReddyChinasani/JsonFoundry/pulls)

