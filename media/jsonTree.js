document.querySelectorAll('.node-box').forEach(box => {
  box.addEventListener('click', () => {
    const path = box.dataset.path;
    const value = JSON.parse(box.dataset.value || '{}');

    const popup = document.getElementById('popup');
    popup.style.display = 'block';
    popup.querySelector('span').textContent = path;

    const pre = popup.querySelector('pre');
    pre.textContent = typeof value === 'object'
      ? Object.entries(value).map(([k, v]) => `${k}: ${JSON.stringify(v)}`).join('\n')
      : value;

    const copyBtn = popup.querySelector('.copy-btn');
    copyBtn.onclick = () => navigator.clipboard.writeText(path);
  });
});

document.addEventListener('click', e => {
  if (!e.target.closest('.node-box') && !e.target.closest('#popup')) {
    document.getElementById('popup').style.display = 'none';
  }
});

document.querySelectorAll('.node-box').forEach(box => {
  box.addEventListener('click', () => {
    const path = box.dataset.path;
    const value = JSON.parse(box.dataset.value || '{}');

    const popup = document.getElementById('popup');
    popup.style.display = 'block';
    popup.querySelector('span').textContent = path;

    const pre = popup.querySelector('pre');
    pre.textContent = typeof value === 'object'
      ? Object.entries(value).map(([k, v]) => `${k}: ${JSON.stringify(v)}`).join('\n')
      : value;

    const copyBtn = popup.querySelector('.copy-btn');
    copyBtn.onclick = () => navigator.clipboard.writeText(path);
  });
});

document.addEventListener('click', e => {
  if (!e.target.closest('.node-box') && !e.target.closest('#popup')) {
    document.getElementById('popup').style.display = 'none';
  }
});

function drawConnectors() {
  document.querySelectorAll('.node-wrapper').forEach(wrapper => {
    const parentBox = wrapper.querySelector('.node-box');
    const childrenContainer = wrapper.querySelector('.children');
    const svg = wrapper.querySelector('.connector-svg');

    if (!parentBox || !childrenContainer || !svg) return;

    const svgNS = 'http://www.w3.org/2000/svg';
    svg.innerHTML = '';

    const parentRect = parentBox.getBoundingClientRect();
    const svgRect = svg.getBoundingClientRect();

    childrenContainer.querySelectorAll('.node-box').forEach(childBox => {
      const childRect = childBox.getBoundingClientRect();

      const startX = parentRect.right - svgRect.left;
      const startY = parentRect.top + parentRect.height / 2 - svgRect.top;

      const endX = childRect.left - svgRect.left;
      const endY = childRect.top + childRect.height / 2 - svgRect.top;

      const path = document.createElementNS(svgNS, 'path');
      path.setAttribute('class', 'connector-path');
      path.setAttribute('d', `M${startX},${startY} C${startX + 40},${startY} ${endX - 40},${endY} ${endX},${endY}`);
      svg.appendChild(path);
    });
  });
}

window.addEventListener('load', () => {
  // Ensure full layout is settled before drawing lines
  setTimeout(drawConnectors, 50);
});
