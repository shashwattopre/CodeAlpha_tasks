const galleryItems = document.querySelectorAll(".gallery img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".close");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

let currentIndex = 0;
let images = Array.from(galleryItems);

galleryItems.forEach((img, index) => {
    img.addEventListener("click", () => {
        currentIndex = index;
        showLightbox(images[currentIndex].src);
    });
});

function showLightbox(src) {
    lightboxImg.src = src;
    lightbox.style.display = "flex";
}

closeBtn.addEventListener("click", () => {
    lightbox.style.display = "none";
});

prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showLightbox(images[currentIndex].src);
});

nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % images.length;
    showLightbox(images[currentIndex].src);
});

document.querySelectorAll(".filters button").forEach(btn => {
    btn.addEventListener("click", () => {
        const filter = btn.dataset.filter;
        images = Array.from(document.querySelectorAll(".gallery img"));

        images.forEach(img => {
            img.style.display =
                filter === "all" || img.dataset.category === filter ? "block" : "none";
        });

        images = filter === "all"
            ? Array.from(document.querySelectorAll(".gallery img"))
            : Array.from(document.querySelectorAll(`.gallery img[data-category="${filter}"]`));
    });
});

const chk = document.getElementById('chk');

chk.addEventListener('change', () => {
    document.body.classList.toggle('dark');
});


const floating_btn = document.querySelector('.floating-btn');
const close_btn = document.querySelector('.close-btn');
const social_panel_container = document.querySelector('.social-panel-container');

floating_btn.addEventListener('click', () => {
    social_panel_container.classList.toggle('visible')
});

close_btn.addEventListener('click', () => {
    social_panel_container.classList.remove('visible')
});