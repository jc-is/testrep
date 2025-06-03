// Função para carregar um parcial
async function loadPartial(selector, url) {
  const res = await fetch(url);
  const html = await res.text();
  document.querySelector(selector).innerHTML = html;
}

// Exemplo de dados dos cards (poderá ser carregado de JSON externo futuramente)
const cardsData = [
  {
    videoUrl: "videos/treinamento1.mp4",
    titulo: "Treinamento 1",
    pdfUrl: "pdfs/treinamento1.pdf"
  },
  {
    videoUrl: "videos/treinamento2.mp4",
    titulo: "Treinamento 2",
    pdfUrl: "pdfs/treinamento2.pdf"
  }
];

// Função para renderizar os cards com base no card.html
async function renderCards() {
  const res = await fetch("/partials/card.html");
  const cardTemplate = await res.text();
  const container = document.querySelector("#treinamentos-section");

  cardsData.forEach(card => {
    const cardHTML = cardTemplate
      .replace("{{videoUrl}}", card.videoUrl)
      .replace("{{titulo}}", card.titulo)
      .replace("{{pdfUrl}}", card.pdfUrl);
    container.innerHTML += cardHTML;
  });
}

// Carregar tudo
(async () => {
  await loadPartial("#layout", "/partials/layout.html");
  await loadPartial("#sections", "/partials/sections.html");
  await renderCards();
})();
