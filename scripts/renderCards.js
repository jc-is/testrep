async function loadAndRenderCards() {
  try {
    // 1. Carrega o JSON externo com os dados dos cards
    const res = await fetch('/scripts/cardsData.json');
    const allCards = await res.json();

    // 2. Carrega o template base do card
    const templateRes = await fetch('/partials/card.html');
    const cardTemplate = await templateRes.text();

    // 3. Para cada seção, renderiza os cards
    for (const [sectionId, cards] of Object.entries(allCards)) {
      const container = document.querySelector(`#${sectionId} .swiper-wrapper`);
      if (!container) continue;

      cards.forEach(card => {
        const cardHTML = cardTemplate
          .replace("{{videoUrl}}", card.videoUrl)
          .replace("{{titulo}}", card.titulo)
          .replace("{{pdfUrl}}", card.pdfUrl);
        container.innerHTML += cardHTML;
      });
    }

    // 4. Inicializa os carrosséis
    new Swiper('.mySwiper', {
      slidesPerView: 1,
      spaceBetween: 16,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      breakpoints: {
        640: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 }
      }
    });

  } catch (error) {
    console.error("Erro ao carregar os cards:", error);
  }
}

// Inicia o carregamento
loadAndRenderCards();
