// Carrega os parciais de layout e sections
async function loadLayoutAndSections() {
  const layoutRes = await fetch('/partials/layout.html');
  const layoutHTML = await layoutRes.text();
  document.getElementById('layout').innerHTML = layoutHTML;

  const sectionsRes = await fetch('/partials/sections.html');
  const sectionsHTML = await sectionsRes.text();
  document.getElementById('sections').innerHTML = sectionsHTML;
}

// Aguarda o carregamento completo antes de renderizar os cards
async function init() {
  await loadLayoutAndSections();
  await import('./renderCards.js'); // Chama o render após DOM estar pronto
}

init();
