document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');

    // Add scrolled class to navbar on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Adjust for fixed navbar height
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // --- Lightbox Modal for Gallery Images ---
    const galleryImages = document.querySelectorAll('.gallery-img');
    if (galleryImages.length > 0) {
        // Create lightbox elements dynamically
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox-modal';
        lightbox.innerHTML = `
            <button class="lightbox-close" aria-label="Close"><i class="fa-solid fa-xmark"></i></button>
            <button class="lightbox-nav lightbox-prev" aria-label="Previous"><i class="fa-solid fa-chevron-left"></i></button>
            <div class="lightbox-content">
                <img class="lightbox-img" src="" alt="">
                <div class="lightbox-caption"></div>
            </div>
            <button class="lightbox-nav lightbox-next" aria-label="Next"><i class="fa-solid fa-chevron-right"></i></button>
        `;
        document.body.appendChild(lightbox);

        const lightboxImg = lightbox.querySelector('.lightbox-img');
        const lightboxCaption = lightbox.querySelector('.lightbox-caption');
        const btnClose = lightbox.querySelector('.lightbox-close');
        const btnPrev = lightbox.querySelector('.lightbox-prev');
        const btnNext = lightbox.querySelector('.lightbox-next');
        let currentIndex = 0;

        function showLightbox(index) {
            currentIndex = (index + galleryImages.length) % galleryImages.length;
            const img = galleryImages[currentIndex];
            lightboxImg.src = img.src;
            lightboxCaption.textContent = img.alt || 'The B Hive Resort';
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function hideLightbox() {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }

        galleryImages.forEach((img, index) => {
            img.addEventListener('click', () => showLightbox(index));
        });

        btnClose.addEventListener('click', hideLightbox);
        btnPrev.addEventListener('click', (e) => {
            e.stopPropagation();
            showLightbox(currentIndex - 1);
        });
        btnNext.addEventListener('click', (e) => {
            e.stopPropagation();
            showLightbox(currentIndex + 1);
        });

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
                hideLightbox();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('active')) return;
            if (e.key === 'Escape') hideLightbox();
            if (e.key === 'ArrowLeft') showLightbox(currentIndex - 1);
            if (e.key === 'ArrowRight') showLightbox(currentIndex + 1);
        });
    }
});

