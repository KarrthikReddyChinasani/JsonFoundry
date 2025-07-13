export function buildHtmlFromJson(obj: any): string {
  return `
    <html>
    <head>
      <style>
        body { font-family: sans-serif; padding: 1em; background: #1e1e1e; color: white; }
        ul { list-style: none; padding-left: 1em; }
        .key { color: #9cdcfe; }
        .value { color: #ce9178; }
      </style>
    </head>
    <body>
      <h2>JSON Tree View</h2>
      ${renderTree(obj)}
    </body>
    </html>
  `;

  function renderTree(obj: any): string {
    if (typeof obj !== 'object' || obj === null) return '';
    return '<ul>' + Object.entries(obj).map(([key, val]) => {
      const valueStr = typeof val === 'object' ? renderTree(val) : `<span class="value">${JSON.stringify(val)}</span>`;
      return `<li><span class="key">${key}</span>: ${valueStr}</li>`;
    }).join('') + '</ul>';
  }
}