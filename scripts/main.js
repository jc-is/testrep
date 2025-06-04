async function loadLayoutAndSections() {
  // Header
  const headerRes = await fetch('/partials/header.html');
  const headerHTML = await headerRes.text();
  document.getElementById('header').innerHTML = headerHTML;

  // Footer
  const footerRes = await fetch('/partials/footer.html');
  const footerHTML = await footerRes.text();
  document.getElementById('footer').innerHTML = footerHTML;

  // Seções
  const sectionsRes = await fetch('/partials/sections.html');
  const sectionsHTML = await sectionsRes.text();
  document.getElementById('sections').innerHTML = sectionsHTML;
}

async function init() {
  await loadLayoutAndSections();
  await import('./renderCards.js');
}

init();
