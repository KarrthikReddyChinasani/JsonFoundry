export function buildHtmlFromJson(obj: any): string {
  return `
    <html>
    <head>
      <style>
        body {
          font-family: sans-serif;
          padding: 1em;
          background: #1e1e1e;
          color: white;
        }
        ul {
          list-style: none;
          padding-left: 1em;
        }
        li {
          margin: 4px 0;
        }
        .key {
          color: #9cdcfe;
        }
        .value {
          color: #ce9178;
        }
        .type-icon {
          margin-right: 0.5em;
          font-size: 0.95em;
          opacity: 0.8;
        }
      </style>
    </head>
    <body>
      <h2>JSON Tree View</h2>
      ${renderTree(obj)}
    </body>
    </html>
  `;

  function renderTree(obj: any): string {
    if (typeof obj !== "object" || obj === null) return "";

    return (
      "<ul>" +
      Object.entries(obj)
        .map(([key, val]) => {
          const typeIcon = getTypeIcon(val);
          const valueStr =
            typeof val === "object" && val !== null
              ? renderTree(val)
              : typeof val === "function"
              ? `<span class="value">[Function]</span>`
              : `<span class="value">${JSON.stringify(val)}</span>`;

          return `<li>
        <span class="type-icon">${typeIcon}</span>
        <span class="key">${key}</span>: ${valueStr}
      </li>`;
        })
        .join("") +
      "</ul>"
    );
  }

  function getTypeIcon(val: any): string {
    if (typeof val === "function") return "⚙️"; // Function
    if (Array.isArray(val)) return "📚"; // Array
    if (typeof val === "object" && val !== null) return "📦"; // Object
    return "📄"; // Primitive
  }
}
