document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("collabs-container");
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const closeBtn = document.querySelector(".lightbox-close");
    const prevBtn = document.getElementById("lightbox-prev");
    const nextBtn = document.getElementById("lightbox-next");

    let currentGallery = [];
    let currentIndex = 0;

    // 1. Build the Collabs HTML dynamically
    portfolioData.forEach((collab, index) => {
        const isEven = index % 2 === 0;
        const section = document.createElement("section");
        section.className = `${collab.accentColor} poster-screen`;
        
        // Alternate layout logic
        const contentLeft = `
            <div class="col-text">
                <h2 class="massive-text ${collab.textColor} sideways-text">WORK</h2>
            </div>
            <div class="col-media">
                <img src="${collab.heroImage}" alt="${collab.client}" class="project-img cursor-pointer" data-index="${index}">
                <p class="metadata txt-white mt-1">0${index + 1} // ${collab.client} — ${collab.year}<br>${collab.role} [CLICK TO VIEW]</p>
            </div>
        `;
        
        const contentRight = `
            <div class="col-media">
                <img src="${collab.heroImage}" alt="${collab.client}" class="project-img cursor-pointer" data-index="${index}">
                <p class="metadata txt-white mt-1">0${index + 1} // ${collab.client} — ${collab.year}<br>${collab.role} [CLICK TO VIEW]</p>
            </div>
            <div class="col-text" style="text-align: right;">
                <h2 class="massive-text ${collab.textColor} sideways-text" style="transform: rotate(0deg); writing-mode: vertical-lr;">WORK</h2>
            </div>
        `;

        section.innerHTML = `
            <div class="layout-grid" ${!isEven ? 'style="grid-template-columns: 2fr 1fr;"' : ''}>
                ${isEven ? contentLeft : contentRight}
            </div>
        `;
        container.appendChild(section);
    });

    // 2. Lightbox Logic
    const openLightbox = (index) => {
        currentGallery = portfolioData[index].gallery;
        currentIndex = 0;
        updateLightboxImage();
        lightbox.classList.remove("hidden");
    };

    const updateLightboxImage = () => {
        lightboxImg.src = currentGallery[currentIndex];
        // Hide arrows if there's only 1 image
        prevBtn.style.display = currentGallery.length > 1 ? "block" : "none";
        nextBtn.style.display = currentGallery.length > 1 ? "block" : "none";
    };

    // Event Listeners
    document.querySelectorAll(".project-img").forEach(img => {
        img.addEventListener("click", (e) => openLightbox(e.target.dataset.index));
    });

    closeBtn.addEventListener("click", () => lightbox.classList.add("hidden"));
    
    prevBtn.addEventListener("click", () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : currentGallery.length - 1;
        updateLightboxImage();
    });

    nextBtn.addEventListener("click", () => {
        currentIndex = (currentIndex < currentGallery.length - 1) ? currentIndex + 1 : 0;
        updateLightboxImage();
    });

    // Close on escape key
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") lightbox.classList.add("hidden");
    });
});