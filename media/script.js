(function () {
  const vscode = acquireVsCodeApi();

  document.querySelectorAll('.node').forEach(node => {
    node.addEventListener('click', () => {
      const key = node.getAttribute('data-key');
      const value = node.getAttribute('data-value');
      const path = node.getAttribute('data-path');

      const popup = document.createElement('div');
      popup.className = 'popup';
      popup.innerHTML = `
        <strong>Path:</strong> <code>${path}</code>
        <button class="copy-btn">📋</button>
        <hr/>
        <pre>${JSON.stringify(JSON.parse(value), null, 2)}</pre>
      `;

      popup.querySelector('.copy-btn').addEventListener('click', () => {
        navigator.clipboard.writeText(path);
      });

      document.body.appendChild(popup);
      popup.addEventListener('click', () => popup.remove());
    });
  });

  const copyTsBtn = document.getElementById('copyTs');
  if (copyTsBtn) {
    copyTsBtn.onclick = () => {
      const code = document.getElementById('tsOutput');
      navigator.clipboard.writeText(code.textContent);
    };
  }

  const downloadBtn = document.getElementById('downloadTs');
  if (downloadBtn) {
    downloadBtn.onclick = () => {
      const code = document.getElementById('tsOutput').textContent;
      const blob = new Blob([code], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'interface.ts';
      a.click();
      URL.revokeObjectURL(url);
    };
  }
})();