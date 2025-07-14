export function setupLegendToggle() {
  const toggleBtn = document.querySelector(".legend-toggle");
  const legendBox = document.querySelector(".type-legend");

  if (!toggleBtn || !legendBox) {
    console.warn("Legend toggle or box not found");
    return;
  }

  toggleBtn.addEventListener("click", () => {
    legendBox.classList.toggle("hidden");
  });
}
