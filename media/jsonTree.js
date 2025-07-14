document.addEventListener("DOMContentLoaded", () => {
  const popup = document.getElementById("popup");

  const closeBtn = popup.querySelector(".close-btn");
  closeBtn.onclick = () => {
    popup.style.display = "none";
  };

  /**
   * legend toggle start
   */

  const toggleBtn = document.querySelector(".legend-toggle");
  const legendBox = document.querySelector(".type-legend");

  if (!toggleBtn || !legendBox) {
    console.warn("Legend toggle or box not found");
    return;
  }

  toggleBtn.addEventListener("click", () => {
    legendBox.classList.toggle("hidden");
  });

  /**
   * legend toggle stop
   */

  document.querySelectorAll(".node-box").forEach((box) => {
    box.addEventListener("click", () => {
      const path = box.dataset.path;
      const value = JSON.parse(box.dataset.value || "{}");

      popup.style.display = "block";
      popup.querySelector("span").textContent = path;

      const pre = popup.querySelector("pre");
      pre.innerHTML = formatValue(value);

      const copyBtn = popup.querySelector(".copy-btn");
      copyBtn.onclick = () => {
        navigator.clipboard.writeText(path);
        copyBtn.textContent = "Path Copied";
        copyBtn.style.background = "green";
        copyBtn.style.color = "white";

        setTimeout(() => {
          copyBtn.textContent = "Copy Path";
          copyBtn.style.background = "#333";
          copyBtn.style.color = "#fff";
        }, 1000);
      };
    });
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".node-box") && !e.target.closest("#popup")) {
      popup.style.display = "none";
    }
  });

  document.querySelectorAll(".toggle-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const wrapper = btn.closest(".node-wrapper");
      const children = wrapper.querySelector(".children");
      if (children) {
        children.classList.toggle("collapsed");
        btn.textContent = children.classList.contains("collapsed") ? "+" : "−";
        drawConnectors();
      }
    });
  });

  function drawConnectors() {
    document.querySelectorAll(".node-wrapper").forEach((wrapper) => {
      const parentBox = wrapper.querySelector(".node-box");
      const childrenContainer = wrapper.querySelector(".children");
      const svg = wrapper.querySelector(".connector-svg");

      if (
        !parentBox ||
        !childrenContainer ||
        !svg ||
        childrenContainer.classList.contains("collapsed")
      )
        return;

      const svgNS = "http://www.w3.org/2000/svg";
      svg.innerHTML = "";

      const parentRect = parentBox.getBoundingClientRect();
      const svgRect = svg.getBoundingClientRect();

      childrenContainer
        .querySelectorAll(":scope > .node-wrapper > .node-box")
        .forEach((childBox) => {
          const childRect = childBox.getBoundingClientRect();

          const startX = parentRect.right - svgRect.left;
          const startY = parentRect.top + parentRect.height / 2 - svgRect.top;

          const endX = childRect.left - svgRect.left;
          const endY = childRect.top + childRect.height / 2 - svgRect.top;

          console.log("Parent:", parentRect);
          console.log("Child:", childRect);

          const path = document.createElementNS(svgNS, "path");
          path.setAttribute("class", "connector-path");
          path.setAttribute(
            "d",
            `M${startX},${startY} C${startX + 80},${startY} ${
              endX - 80
            },${endY} ${endX},${endY}`
          );
          svg.appendChild(path);
        });
    });
  }

  function formatValue(val, indent = 0) {
    const spacer = "  ";
    const pad = spacer.repeat(indent);

    if (typeof val === "string")
      return `<span class="value-string">"${val}"</span>`;
    if (typeof val === "number")
      return `<span class="value-number">${val}</span>`;
    if (typeof val === "boolean")
      return `<span class="value-boolean">${val}</span>`;
    if (val === null) return `<span class="value-null">null</span>`;

    if (Array.isArray(val)) {
      if (val.length === 0) return "[]";
      const items = val
        .map((item) => `${pad}${spacer}${formatValue(item, indent + 1)}`)
        .join(",\n");
      return `[\n${items}\n${pad}]`;
    }

    if (typeof val === "object") {
      const entries = Object.entries(val);
      if (entries.length === 0) return "{}";
      const props = entries
        .map(([k, v]) => {
          return `${pad}${spacer}<span class="key">${k}</span>: ${formatValue(
            v,
            indent + 1
          )}`;
        })
        .join(",\n");
      return `{\n${props}\n${pad}}`;
    }

    return String(val);
  }

  // ⬇️ Move window load listener inside DOMContentLoaded
  window.addEventListener("load", () => {
    const treeWrapper = document.querySelector(".tree-wrapper");
    if (treeWrapper) {
      const observer = new ResizeObserver(() => drawConnectors());
      observer.observe(treeWrapper);
    }
    drawConnectors(); // Initial draw
  });
});
