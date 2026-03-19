document.addEventListener('DOMContentLoaded', () => {
    
    // Mobile Navigation Toggle
    const menuBtn = document.querySelector('.menu-btn');
    const closeBtn = document.querySelector('.close-menu-btn');
    const navOverlay = document.querySelector('.nav-overlay');
    const navLinks = document.querySelectorAll('.nav-overlay ul li a');

    if(menuBtn) {
        menuBtn.addEventListener('click', () => {
            navOverlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
        });
    }

    if(closeBtn) {
        closeBtn.addEventListener('click', () => {
            navOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    // FAQ Accordion Logic
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        item.addEventListener('click', () => {
            // Close other open items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            // Toggle current item
            item.classList.toggle('active');
        });
    });

    // Handle Placeholder images logic
    const profileImg = document.getElementById('profile-img');
    const placeholderText = document.querySelector('.hero-image-container .placeholder-text');
    
    if (profileImg) {
        profileImg.addEventListener('error', function() {
            profileImg.style.opacity = '0';
            if(placeholderText) placeholderText.style.display = 'block';
        });
        
        profileImg.addEventListener('load', function() {
            if (profileImg.naturalWidth > 10) {
                 if(placeholderText) placeholderText.style.display = 'none';
            }
        });
        
        if (profileImg.complete && profileImg.naturalWidth > 10) {
            if(placeholderText) placeholderText.style.display = 'none';
        }
    }

    // Lightbox Logic for all project images
    function initLightbox() {
        // Create lightbox elements if they don't exist
        if (!document.querySelector('.lightbox-overlay')) {
            const overlay = document.createElement('div');
            overlay.className = 'lightbox-overlay';
            overlay.innerHTML = `
                <button class="lightbox-close">&times;</button>
                <img class="lightbox-content" src="" alt="Fullscreen Image">
            `;
            document.body.appendChild(overlay);

            // Close events
            const closeBtn = overlay.querySelector('.lightbox-close');
            closeBtn.addEventListener('click', () => overlay.classList.remove('active'));
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) overlay.classList.remove('active');
            });
            // Escape key to close
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && overlay.classList.contains('active')) {
                    overlay.classList.remove('active');
                }
            });
        }

        const overlay = document.querySelector('.lightbox-overlay');
        const lightboxImg = overlay.querySelector('.lightbox-content');

        // Select all images inside project detail cards and project thumbnail grids
        const projectImages = document.querySelectorAll('.pd-image-wrapper img, .project-image img');
        
        projectImages.forEach(img => {
            // Apply cursor pointer via JS just in case CSS misses some
            img.style.cursor = 'pointer';
            
            img.addEventListener('click', function(e) {
                e.preventDefault();
                // Get the source of the clicked image
                const imgSrc = this.getAttribute('src');
                if (imgSrc && imgSrc.trim() !== '') {
                    lightboxImg.src = imgSrc;
                    lightboxImg.alt = this.getAttribute('alt') || 'Project Image';
                    overlay.classList.add('active');
                }
            });
        });
    }

    // Initialize lightbox
    initLightbox();

});
