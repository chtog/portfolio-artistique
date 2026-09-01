document.addEventListener("DOMContentLoaded", () => {
  const images = Array.from(document.querySelectorAll(".project-images img"));
  if (images.length === 0) return;

  const overlay = document.createElement("div");
  overlay.className = "lightbox-overlay";
  overlay.innerHTML = `
    <button class="lightbox-close" aria-label="Fermer">&times;</button>
    <button class="lightbox-arrow lightbox-prev" aria-label="Image précédente">&#8249;</button>
    <div class="lightbox-content">
      <img src="" alt="">
      <p class="lightbox-caption"></p>
    </div>
    <button class="lightbox-arrow lightbox-next" aria-label="Image suivante">&#8250;</button>
  `;
  document.body.appendChild(overlay);

  const lightboxImg = overlay.querySelector("img");
  const lightboxCaption = overlay.querySelector(".lightbox-caption");
  const closeBtn = overlay.querySelector(".lightbox-close");
  const prevBtn = overlay.querySelector(".lightbox-prev");
  const nextBtn = overlay.querySelector(".lightbox-next");

  let currentIndex = 0;

  function show(index) {
    currentIndex = (index + images.length) % images.length;
    const img = images[currentIndex];
    const figcaption = img.closest("figure")?.querySelector("figcaption");
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxCaption.textContent = figcaption ? figcaption.textContent : img.alt;
  }

  function open(index) {
    show(index);
    overlay.classList.add("open");
  }

  function close() {
    overlay.classList.remove("open");
  }

  images.forEach((img, index) => {
    img.style.cursor = "pointer";
    img.addEventListener("click", () => open(index));
  });

  closeBtn.addEventListener("click", close);
  prevBtn.addEventListener("click", () => show(currentIndex - 1));
  nextBtn.addEventListener("click", () => show(currentIndex + 1));

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) close();
  });

  document.addEventListener("keydown", (e) => {
    if (!overlay.classList.contains("open")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") show(currentIndex - 1);
    if (e.key === "ArrowRight") show(currentIndex + 1);
  });
});
