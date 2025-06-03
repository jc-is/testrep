// Função para carregar um parcial
async function loadPartial(selector, url) {
  const res = await fetch(url);
  const html = await res.text();
  document.querySelector(selector).innerHTML = html;
}

// Dados dos cards por seção
const allCardsData = {
  'treinamentos-section': [
    { videoUrl: 'videos/treinamento1.mp4', titulo: 'Treinamento 1', pdfUrl: 'pdfs/treinamento1.pdf' },
    { videoUrl: 'videos/treinamento2.mp4', titulo: 'Treinamento 2', pdfUrl: 'pdfs/treinamento2.pdf' },
    { videoUrl: 'videos/treinamento3.mp4', titulo: 'Treinamento 3', pdfUrl: 'pdfs/treinamento3.pdf' },
    { videoUrl: 'videos/treinamento4.mp4', titulo: 'Treinamento 4', pdfUrl: 'pdfs/treinamento4.pdf' }
  ],
  'composer-section': Array.from({ length: 10 }, (_, i) => ({
    videoUrl: `videos/composer${i + 1}.mp4`,
    titulo: `Composer ${i + 1}`,
    pdfUrl: `pdfs/composer${i + 1}.pdf`
  })),
  'photocenter-section': Array.from({ length: 4 }, (_, i) => ({
    videoUrl: `videos/photo${i + 1}.mp4`,
    titulo: `Photo ${i + 1}`,
    pdfUrl: `pdfs/photo${i + 1}.pdf`
  })),
  'videocenter-section': Array.from({ length: 5 }, (_, i) => ({
    videoUrl: `videos/video${i + 1}.mp4`,
    titulo: `Vídeo ${i + 1}`,
    pdfUrl: `pdfs/video${i + 1}.pdf`
  })),
  'pagebuilder-section': Array.from({ length: 5 }, (_, i) => ({
    videoUrl: `videos/pagebuilder${i + 1}.mp4`,
    titulo: `Page ${i + 1}`,
    pdfUrl: `pdfs/pagebuilder${i + 1}.pdf`
  }))
};

// Função para renderizar os cards e ativar o Swiper
async function renderAllCards() {
  const res = await fetch('/partials/card.html');
  const cardTemplate = await res.text();

  for (const [sectionId, cards] of Object.entries(allCardsData)) {
    const section = document.querySelector(`#${sectionId} .swiper-wrapper`);
    if (!section) continue;

    cards.forEach(card => {
      const cardHTML = cardTemplate
        .replace('{{videoUrl}}', card.videoUrl)
        .replace('{{titulo}}', card.titulo)
        .replace('{{pdfUrl}}', card.pdfUrl);
      section.innerHTML += cardHTML;
    });

    // Inicializa o Swiper para esta seção
    new Swiper(`#${sectionId}`, {
      slidesPerView: 1,
      spaceBetween: 20,
      navigation: {
        nextEl: `#${sectionId} .swiper-button-next`,
        prevEl: `#${sectionId} .swiper-button-prev`
      },
      breakpoints: {
        640: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 }
      }
    });
  }
}

// Execução inicial
(async () => {
  await loadPartial('#layout', '/partials/layout.html');
  await loadPartial('#sections', '/partials/sections.html');
  await renderAllCards();
})();
