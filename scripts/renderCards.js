// Função para carregar um parcial (layout e sections)
async function loadPartial(selector, url) {
  const res = await fetch(url);
  const html = await res.text();
  document.querySelector(selector).innerHTML = html;
}

// Dados simulados para cada seção
const cardSectionsData = {
  "treinamentos-section": [
    { videoUrl: "videos/treinamento1.mp4", titulo: "Treinamento 1", pdfUrl: "pdfs/treinamento1.pdf" },
    { videoUrl: "videos/treinamento2.mp4", titulo: "Treinamento 2", pdfUrl: "pdfs/treinamento2.pdf" },
    { videoUrl: "videos/treinamento3.mp4", titulo: "Treinamento 3", pdfUrl: "pdfs/treinamento3.pdf" },
    { videoUrl: "videos/treinamento4.mp4", titulo: "Treinamento 4", pdfUrl: "pdfs/treinamento4.pdf" }
  ],
  "composer-section": Array.from({ length: 10 }, (_, i) => ({
    videoUrl: `videos/composer${i + 1}.mp4`,
    titulo: `Composer ${i + 1}`,
    pdfUrl: `pdfs/composer${i + 1}.pdf`
  })),
  "photocenter-section": Array.from({ length: 4 }, (_, i) => ({
    videoUrl: `videos/photo${i + 1}.mp4`,
    titulo: `Photo Center ${i + 1}`,
    pdfUrl: `pdfs/photo${i + 1}.pdf`
  })),
  "videocenter-section": Array.from({ length: 5 }, (_, i) => ({
    videoUrl: `videos/video${i + 1}.mp4`,
    titulo: `Video Center ${i + 1}`,
    pdfUrl: `pdfs/video${i + 1}.pdf`
  })),
  "pagebuilder-section": Array.from({ length: 5 }, (_, i) => ({
    videoUrl: `videos/pagebuilder${i + 1}.mp4`,
    titulo: `PageBuilder ${i + 1}`,
    pdfUrl: `pdfs/pagebuilder${i + 1}.pdf`
  }))
};

// Função para renderizar os cards em todas as seções
async function renderAllCards() {
  const res = await fetch("/partials/card.html");
  const cardTemplate = await res.text();

  for (const [sectionId, cards] of Object.entries(cardSectionsData)) {
    const sectionEl = document.querySelector(`#${sectionId} .swiper-wrapper`);

    cards.forEach(card => {
      const cardHTML = cardTemplate
        .replace("{{videoUrl}}", card.videoUrl)
        .replace("{{titulo}}", card.titulo)
        .replace("{{pdfUrl}}", card.pdfUrl);

      const slide = document.createElement("div");
      slide.classList.add("swiper-slide");
      slide.innerHTML = cardHTML;

      sectionEl.appendChild(slide);
    });
  }
}

// Função para iniciar todos os carrosséis Swiper
function initSwipers() {
  const swipers = document.querySelectorAll(".mySwiper");

  swipers.forEach(swiperEl => {
    new Swiper(swiperEl, {
      slidesPerView: 1,
      spaceBetween: 10,
      navigation: {
        nextEl: swiperEl.querySelector(".swiper-button-next"),
        prevEl: swiperEl.querySelector(".swiper-button-prev")
      },
      breakpoints: {
        640: { slidesPerView: 2, spaceBetween: 20 },
        1024: { slidesPerView: 3, spaceBetween: 30 }
      }
    });
  });
}

// Carrega tudo na ordem
(async () => {
  await loadPartial("#layout", "/partials/layout.html");
  await loadPartial("#sections", "/partials/sections.html");
  await renderAllCards();
  initSwipers();
})();
