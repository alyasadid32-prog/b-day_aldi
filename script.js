const pages = document.querySelectorAll(".page");
const navButtons = document.querySelectorAll(".nav-btn");

function showPage(pageId) {
  pages.forEach(page => page.classList.toggle("active", page.id === pageId));
  navButtons.forEach(button => button.classList.toggle("active", button.dataset.page === pageId));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

navButtons.forEach(button => {
  button.addEventListener("click", () => showPage(button.dataset.page));
});

document.querySelectorAll("[data-go]").forEach(button => {
  button.addEventListener("click", () => showPage(button.dataset.go));
});

const envelope = document.getElementById("envelope");
const letterContent = document.getElementById("letter-content");
envelope.addEventListener("click", () => {
  letterContent.hidden = false;
  envelope.textContent = "♡";
  envelope.disabled = true;
  envelope.style.opacity = ".65";
});

// =================================
// BACKGROUND MUSIC ALDI
// =================================

const music = document.getElementById("background-music");
const musicToggle = document.getElementById("music-toggle");

if (music && musicToggle) {

    // Volume musik 70%
    music.volume = 0.7;

    // Mengubah ikon sesuai kondisi musik
    function updateMusicIcon() {
        musicToggle.textContent = music.paused ? "♫" : "♪";

        musicToggle.title = music.paused
            ? "Putar musik"
            : "Matikan musik";
    }

    // Coba putar otomatis saat website dibuka
    music.play()
        .then(updateMusicIcon)
        .catch(() => {
            updateMusicIcon();
        });

    // Tombol Play dan Pause
    musicToggle.addEventListener("click", async () => {

        if (music.paused) {
            try {
                await music.play();
            } catch (error) {
                console.log("Musik belum dapat diputar.");
            }
        } else {
            music.pause();
        }

        updateMusicIcon();
    });

    // Jika autoplay diblokir browser,
    // musik mulai setelah interaksi pertama
    const startMusic = async () => {
        if (music.paused) {
            try {
                await music.play();
            } catch (error) {
                console.log("Menunggu interaksi berikutnya.");
            }
        }

        updateMusicIcon();
    };
    // VIDEO DAN BACKGROUND MUSIC
document.querySelectorAll("video").forEach(video => {

    video.addEventListener("play", () => {
        if (music) music.pause();
    });

    video.addEventListener("pause", () => {
        if (music && !video.ended) {
            music.play().catch(() => {});
        }
    });

    video.addEventListener("ended", () => {
        if (music) {
            music.play().catch(() => {});
        }
    });

});

    document.addEventListener("click", startMusic, { once: true });
    document.addEventListener("keydown", startMusic, { once: true });

    music.addEventListener("play", updateMusicIcon);
    music.addEventListener("pause", updateMusicIcon);

    updateMusicIcon();
}
