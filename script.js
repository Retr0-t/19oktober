document.addEventListener("DOMContentLoaded", () => {
  const text = "Happy Anniversary Sayang ";
  let i = 0;
  const speed = 100;

  const typewriterEl = document.getElementById("typewriter");
  const startBtn = document.getElementById("startBtn");
  const mainContent = document.getElementById("main-content");
  const bgMusic = document.getElementById("bgMusic");

  // === Kunci scroll sebelum popup selesai ===
  document.body.style.overflow = "hidden";

  // === Typewriter Effect ===
  if (typewriterEl) {
    function typeWriter() {
      if (i < text.length) {
        typewriterEl.innerHTML += text.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
      } else if (startBtn) {
        startBtn.classList.add("show");
      }
    }
    typeWriter();
  }

  // === Button Start ===
  if (startBtn) {
    startBtn.addEventListener("click", () => {
      startBtn.style.display = "none";
      if (bgMusic) {
        bgMusic.play().catch(err => console.log("Autoplay diblokir:", err));
      }
      if (mainContent) startPopups();
    });
  }

  // === Popups Awal ===
  function startPopups() {
    const popups = [
      "popup1","popup2","popup3","popup4",
      "popup5","popup6","popup7","popup8"
    ];
    let index = 0;

    function showNext() {
      if (index < popups.length) {
        const popup = document.getElementById(popups[index]);
        if (popup) {
          popup.classList.add("show");
          setTimeout(() => {
            popup.classList.remove("show");
            index++;
            setTimeout(showNext, 500);
          }, 5000); // durasi tiap popup 5 detik
        }
      } else if (mainContent) {
        // Setelah semua popup selesai, tampilkan main content
        mainContent.style.display = "block";
        setTimeout(() => {
          mainContent.classList.add("show");

          // === Buka scroll kembali ===
          document.body.style.overflow = "auto";

          // Scroll otomatis ke main content
          mainContent.scrollIntoView({ behavior: "smooth" });
        }, 300);
      }
    }

    showNext();
  }
// === Quotes Slideshow ===
const quotes = document.querySelectorAll(".quotes .quote");
if (quotes.length > 0) {
  let quoteIndex = 0;
  quotes[0].style.opacity = "1";

  setInterval(() => {
    quotes[quoteIndex].style.opacity = "0";
    quoteIndex = (quoteIndex + 1) % quotes.length;
    quotes[quoteIndex].style.opacity = "1";
  }, 4000); // ganti setiap 4 detik
}



  // === Musik & video message di halaman ===
  const pageVideo = document.querySelector(".video video");
  if (pageVideo && bgMusic) {
    pageVideo.addEventListener("play", () => bgMusic.pause());
    pageVideo.addEventListener("pause", () => bgMusic.play());
    pageVideo.addEventListener("ended", () => bgMusic.play());
  }

  // === Photo Grid Slideshow ===
  const photoGrid = document.querySelector(".photo-grid");
  if (photoGrid) {
    const photos = Array.from(photoGrid.querySelectorAll("img"));
    let currentIndex = 0;
    const interval = 4000; // ganti foto tiap 4 detik

    photoGrid.style.position = "relative";
    photoGrid.style.width = "200%";
    photoGrid.style.maxWidth = "900px";
    photoGrid.style.height = "600px";
    photoGrid.style.margin = "0 auto";
    photoGrid.style.overflow = "hidden";
    photoGrid.style.borderRadius = "20px";

    photos.forEach((photo, index) => {
      photo.style.position = "absolute";
      photo.style.top = 0;
      photo.style.left = 0;
      photo.style.width = "100%";
      photo.style.height = "100%";
      photo.style.objectFit = "cover";
      photo.style.opacity = index === 0 ? "1" : "0";
      photo.style.transition = "opacity 1s ease";
    });

    setInterval(() => {
      photos[currentIndex].style.opacity = 0;
      currentIndex = (currentIndex + 1) % photos.length;
      photos[currentIndex].style.opacity = 1;
    }, interval);
  }
});
