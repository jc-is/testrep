async function loadAndRenderCards() {
  try {
    const res = await fetch('/scripts/cardsData.json');
    console.log("Carregando JSON..."); // ✅
    const allCards = await res.json();
    console.log("Dados carregados:", allCards); // ✅

    const templateRes = await fetch('/partials/card.html');
    const cardTemplate = await templateRes.text();
    console.log("Template carregado."); // ✅

    for (const [sectionId, cards] of Object.entries(allCards)) {
      const container = document.querySelector(`#${sectionId} .swiper-wrapper`);
      if (!container) {
        console.warn(`Container não encontrado para ${sectionId}`);
        continue;
      }

      cards.forEach(card => {
        const cardHTML = cardTemplate
          .replace("{{videoUrl}}", card.videoUrl)
          .replace("{{titulo}}", card.titulo)
          .replace("{{pdfUrl}}", card.pdfUrl);
        container.innerHTML += cardHTML;
      });
    }

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

    console.log("Swiper inicializado."); // ✅

  } catch (error) {
    console.error("Erro ao carregar os cards:", error);
  }
}

// Inicia o carregamento
loadAndRenderCards();
