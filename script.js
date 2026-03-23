/**
 * ============================================
 * PUBG GAMING WEBSITE - INTERACTIVE JAVASCRIPT
 * ============================================
 * 
 * Features:
 * - Custom cursor effects
 * - Preloader animation
 * - Particle system
 * - Scroll animations
 * - Parallax effects
 * - Counter animations
 * - Gallery lightbox
 * - Smooth navigation
 * - Character reveal animation
 * - And more!
 * 
 * ============================================
 */

// ============================================
// 1. DOM ELEMENTS
// ============================================

const DOM = {
    // Preloader
    preloader: document.getElementById('preloader'),
    
    // Cursor
    cursorDot: document.getElementById('cursorDot'),
    cursorOutline: document.getElementById('cursorOutline'),
    
    // Navigation
    navbar: document.getElementById('navbar'),
    navMenu: document.getElementById('navMenu'),
    navToggle: document.getElementById('navToggle'),
    navLinks: document.querySelectorAll('.nav-link'),
    
    // Hero
    particles: document.getElementById('particles'),
    ctaParticles: document.getElementById('ctaParticles'),
    heroTitle: document.querySelector('.hero-title'),
    charAnimations: document.querySelectorAll('.char-animate'),
    
    // Stats
    statNumbers: document.querySelectorAll('.stat-number'),
    
    // Sections
    sections: document.querySelectorAll('.section'),
    animateElements: document.querySelectorAll('.animate-on-scroll'),
    
    // Gallery
    galleryItems: document.querySelectorAll('.gallery-item'),
    lightbox: document.getElementById('lightbox'),
    lightboxImage: document.querySelector('.lightbox-image'),
    lightboxClose: document.querySelector('.lightbox-close'),
    lightboxPrev: document.querySelector('.lightbox-prev'),
    lightboxNext: document.querySelector('.lightbox-next'),
    
    // Back to top
    backToTop: document.getElementById('backToTop'),
    progressRing: document.querySelector('.progress-ring-circle'),
    
    // Weapon tabs
    weaponTabs: document.querySelectorAll('.weapon-tab'),
    weaponCards: document.querySelectorAll('.weapon-card'),
    
    // Map cards
    mapCards: document.querySelectorAll('.map-card')
};

// ============================================
// 2. GLOBAL STATE
// ============================================

const State = {
    mouseX: 0,
    mouseY: 0,
    scrollY: 0,
    currentGalleryIndex: 0,
    galleryImages: [],
    isLoaded: false,
    statsAnimated: false
};

// ============================================
// 3. PRELOADER
// ============================================

function initPreloader() {
    // Hide preloader after load
    window.addEventListener('load', () => {
        setTimeout(() => {
            DOM.preloader.classList.add('hidden');
            document.body.classList.remove('loading');
            State.isLoaded = true;
            
            // Start hero animations
            initHeroAnimations();
        }, 2500);
    });
    
    // Fallback - hide preloader after 4 seconds
    setTimeout(() => {
        if (!State.isLoaded) {
            DOM.preloader.classList.add('hidden');
            document.body.classList.remove('loading');
            State.isLoaded = true;
            initHeroAnimations();
        }
    }, 4000);
}

// ============================================
// 4. CUSTOM CURSOR
// ============================================

function initCustomCursor() {
    // Only on desktop
    if (window.innerWidth <= 768) return;
    
    // Track mouse position
    document.addEventListener('mousemove', (e) => {
        State.mouseX = e.clientX;
        State.mouseY = e.clientY;
    });
    
    // Animate cursor
    function animateCursor() {
        DOM.cursorDot.style.left = State.mouseX + 'px';
        DOM.cursorDot.style.top = State.mouseY + 'px';
        
        DOM.cursorOutline.style.left = State.mouseX + 'px';
        DOM.cursorOutline.style.top = State.mouseY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    animateCursor();
    
    // Hover effects
    const hoverElements = document.querySelectorAll('a, button, .map-card, .weapon-card, .operator-card, .mode-card, .gallery-item');
    
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            DOM.cursorOutline.classList.add('hover');
        });
        
        el.addEventListener('mouseleave', () => {
            DOM.cursorOutline.classList.remove('hover');
        });
    });
    
    // Click effect
    document.addEventListener('mousedown', () => {
        DOM.cursorOutline.classList.add('clicking');
    });
    
    document.addEventListener('mouseup', () => {
        DOM.cursorOutline.classList.remove('clicking');
    });
}

// ============================================
// 5. NAVIGATION
// ============================================

function initNavigation() {
    // Scroll effect
    window.addEventListener('scroll', () => {
        State.scrollY = window.scrollY;
        
        if (State.scrollY > 100) {
            DOM.navbar.classList.add('scrolled');
        } else {
            DOM.navbar.classList.remove('scrolled');
        }
        
        // Update active nav link
        updateActiveNavLink();
    });
    
    // Mobile toggle
    DOM.navToggle.addEventListener('click', () => {
        DOM.navToggle.classList.toggle('active');
        DOM.navMenu.classList.toggle('active');
        document.body.style.overflow = DOM.navMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Nav link clicks
    DOM.navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                const navHeight = DOM.navbar.offsetHeight;
                const targetPosition = target.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu
                DOM.navToggle.classList.remove('active');
                DOM.navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 200;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            DOM.navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + sectionId) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ============================================
// 6. PARTICLE SYSTEM
// ============================================

function createParticles(container, count = 50) {
    if (!container) return;
    
    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random position
        particle.style.left = Math.random() * 100 + '%';
        
        // Random animation delay
        particle.style.animationDelay = Math.random() * 15 + 's';
        
        // Random animation duration
        particle.style.animationDuration = (10 + Math.random() * 10) + 's';
        
        // Random size
        const size = 2 + Math.random() * 3;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Random opacity
        particle.style.opacity = 0.3 + Math.random() * 0.7;
        
        container.appendChild(particle);
    }
}

// ============================================
// 7. HERO ANIMATIONS
// ============================================

function initHeroAnimations() {
    // Animate characters with stagger
    DOM.charAnimations.forEach((char, index) => {
        setTimeout(() => {
            char.style.animationDelay = (index * 0.05) + 's';
            char.style.animationPlayState = 'running';
        }, 500);
    });
    
    // Create particles
    createParticles(DOM.particles, 50);
    createParticles(DOM.ctaParticles, 30);
}

// ============================================
// 8. SCROLL ANIMATIONS
// ============================================

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add stagger delay
                setTimeout(() => {
                    entry.target.classList.add('animated');
                    
                    // Animate stat bars within this element
                    const statBars = entry.target.querySelectorAll('.stat-fill, .stat-bar-fill, .op-stat-fill');
                    animateStatBars(statBars);
                }, index * 100);
            }
        });
    }, observerOptions);
    
    DOM.animateElements.forEach(el => observer.observe(el));
}

function animateStatBars(bars) {
    bars.forEach(bar => {
        const width = bar.style.getPropertyValue('--width');
        bar.style.width = '0%';
        
        setTimeout(() => {
            bar.style.width = width;
        }, 100);
    });
}

// ============================================
// 9. COUNTER ANIMATION
// ============================================

function initCounterAnimation() {
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !State.statsAnimated) {
                State.statsAnimated = true;
                animateCounters();
            }
        });
    }, observerOptions);
    
    const statsContainer = document.querySelector('.hero-stats');
    if (statsContainer) {
        observer.observe(statsContainer);
    }
}

function animateCounters() {
    DOM.statNumbers.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
}

// ============================================
// 10. GALLERY LIGHTBOX
// ============================================

function initGallery() {
    // Collect gallery images
    DOM.galleryItems.forEach((item, index) => {
        const img = item.querySelector('img');
        if (img) {
            State.galleryImages.push(img.src);
            
            item.addEventListener('click', () => {
                openLightbox(index);
            });
        }
    });
    
    // Lightbox controls
    DOM.lightboxClose.addEventListener('click', closeLightbox);
    DOM.lightboxPrev.addEventListener('click', prevImage);
    DOM.lightboxNext.addEventListener('click', nextImage);
    
    // Close on background click
    DOM.lightbox.addEventListener('click', (e) => {
        if (e.target === DOM.lightbox) {
            closeLightbox();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!DOM.lightbox.classList.contains('active')) return;
        
        switch (e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                prevImage();
                break;
            case 'ArrowRight':
                nextImage();
                break;
        }
    });
}

function openLightbox(index) {
    State.currentGalleryIndex = index;
    DOM.lightboxImage.src = State.galleryImages[index];
    DOM.lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    DOM.lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

function prevImage() {
    State.currentGalleryIndex = (State.currentGalleryIndex - 1 + State.galleryImages.length) % State.galleryImages.length;
    DOM.lightboxImage.src = State.galleryImages[State.currentGalleryIndex];
}

function nextImage() {
    State.currentGalleryIndex = (State.currentGalleryIndex + 1) % State.galleryImages.length;
    DOM.lightboxImage.src = State.galleryImages[State.currentGalleryIndex];
}

// ============================================
// 11. BACK TO TOP
// ============================================

function initBackToTop() {
    const circumference = 2 * Math.PI * 22;
    
    if (DOM.progressRing) {
        DOM.progressRing.style.strokeDasharray = circumference;
        DOM.progressRing.style.strokeDashoffset = circumference;
    }
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = scrollTop / docHeight;
        
        // Show/hide button
        if (scrollTop > 500) {
            DOM.backToTop.classList.add('visible');
        } else {
            DOM.backToTop.classList.remove('visible');
        }
        
        // Update progress ring
        if (DOM.progressRing) {
            const offset = circumference - (scrollPercent * circumference);
            DOM.progressRing.style.strokeDashoffset = offset;
        }
    });
    
    DOM.backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============================================
// 12. WEAPON TABS & FILTERING
// ============================================

function initWeaponTabs() {
    const weaponTabs = document.querySelectorAll('.weapon-tab');
    const weaponCards = document.querySelectorAll('.weapon-card');
    const weaponPreview = document.getElementById('weaponPreview');
    
    // Filter weapons by category
    function filterWeapons(category) {
        let firstVisibleCard = null;
        
        weaponCards.forEach((card, index) => {
            const cardCategory = card.getAttribute('data-category');
            
            if (cardCategory === category) {
                card.classList.remove('hidden');
                card.style.animation = 'none';
                card.offsetHeight; // Trigger reflow
                card.style.animation = `fadeInUp 0.4s ease forwards ${index * 0.05}s`;
                
                if (!firstVisibleCard) {
                    firstVisibleCard = card;
                }
            } else {
                card.classList.add('hidden');
                card.classList.remove('active');
            }
        });
        
        // Select first visible weapon
        if (firstVisibleCard) {
            weaponCards.forEach(c => c.classList.remove('active'));
            firstVisibleCard.classList.add('active');
            updateWeaponPreview(firstVisibleCard);
        }
    }
    
    // Update weapon preview panel
    function updateWeaponPreview(card) {
        const data = {
            name: card.getAttribute('data-name'),
            rarity: card.getAttribute('data-rarity'),
            type: card.getAttribute('data-type'),
            desc: card.getAttribute('data-desc'),
            damage: card.getAttribute('data-damage'),
            rate: card.getAttribute('data-rate'),
            range: card.getAttribute('data-range'),
            stability: card.getAttribute('data-stability'),
            ammo: card.getAttribute('data-ammo'),
            mag: card.getAttribute('data-mag'),
            image: card.getAttribute('data-image')
        };
        
        // Update preview elements with animation
        const previewImage = document.getElementById('weaponImg');
        const previewName = document.getElementById('previewName');
        const previewType = document.getElementById('previewType');
        const previewDesc = document.getElementById('previewDesc');
        const previewBadge = document.getElementById('previewBadge');
        
        // Animate out
        if (previewImage) {
            previewImage.style.opacity = '0';
            previewImage.style.transform = 'scale(0.8) rotate(-10deg)';
        }
        
        setTimeout(() => {
            // Update content
            if (previewImage) {
                previewImage.src = data.image;
                previewImage.alt = data.name;
            }
            if (previewName) previewName.textContent = data.name;
            if (previewType) previewType.textContent = data.type;
            if (previewDesc) previewDesc.textContent = data.desc;
            if (previewBadge) {
                previewBadge.textContent = data.rarity.toUpperCase();
                previewBadge.className = 'preview-badge ' + data.rarity;
            }
            
            // Update stats with animation
            const statBars = document.querySelectorAll('.stat-fill-preview');
            statBars.forEach(bar => {
                bar.style.width = '0%';
            });
            
            setTimeout(() => {
                const damageBar = document.querySelector('.stat-fill-preview.damage');
                const rateBar = document.querySelector('.stat-fill-preview.rate');
                const rangeBar = document.querySelector('.stat-fill-preview.range');
                const stabilityBar = document.querySelector('.stat-fill-preview.stability');
                
                if (damageBar) damageBar.style.width = data.damage + '%';
                if (rateBar) rateBar.style.width = data.rate + '%';
                if (rangeBar) rangeBar.style.width = data.range + '%';
                if (stabilityBar) stabilityBar.style.width = data.stability + '%';
                
                // Update stat values
                const statVals = document.querySelectorAll('.preview-stat .stat-val');
                if (statVals[0]) statVals[0].textContent = data.damage;
                if (statVals[1]) statVals[1].textContent = data.rate;
                if (statVals[2]) statVals[2].textContent = data.range;
                if (statVals[3]) statVals[3].textContent = data.stability;
            }, 100);
            
            // Update meta
            const metaSpans = document.querySelectorAll('.preview-meta span');
            if (metaSpans[0]) metaSpans[0].innerHTML = `<i class="fas fa-circle"></i> ${data.ammo}`;
            if (metaSpans[1]) metaSpans[1].innerHTML = `<i class="fas fa-layer-group"></i> ${data.mag} Rounds`;
            
            // Animate in
            if (previewImage) {
                previewImage.style.opacity = '1';
                previewImage.style.transform = 'scale(1) rotate(0deg)';
            }
        }, 200);
    }
    
    // Tab click handlers
    weaponTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Update active tab
            weaponTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            const category = tab.getAttribute('data-category');
            filterWeapons(category);
        });
    });
    
    // Weapon card click handlers
    weaponCards.forEach(card => {
        card.addEventListener('click', () => {
            // Only if visible
            if (card.classList.contains('hidden')) return;
            
            // Update active state
            weaponCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            
            // Update preview
            updateWeaponPreview(card);
        });
        
        // Hover effect
        card.addEventListener('mouseenter', () => {
            if (!card.classList.contains('hidden')) {
                card.style.transform = 'translateX(8px)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
    
    // Initialize with first category (Assault Rifles)
    filterWeapons('ar');
}

// Add fadeInUp animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    #weaponImg {
        transition: opacity 0.3s ease, transform 0.3s ease;
    }
`;
document.head.appendChild(style);

// ============================================
// 13. CARD HOVER EFFECTS
// ============================================

function initCardEffects() {
    // 3D tilt effect on map cards
    DOM.mapCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
    
    // Glow effect on weapon cards
    document.querySelectorAll('.weapon-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            
            card.style.background = `
                radial-gradient(
                    circle at ${x}% ${y}%,
                    rgba(247, 147, 30, 0.1) 0%,
                    rgba(30, 30, 30, 0.8) 50%,
                    rgba(20, 20, 20, 0.9) 100%
                )
            `;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.background = '';
        });
    });
}

// ============================================
// 14. PARALLAX EFFECTS
// ============================================

function initParallax() {
    const heroImage = document.querySelector('.hero-bg');
    
    window.addEventListener('scroll', () => {
        if (heroImage && window.scrollY < window.innerHeight) {
            const scrolled = window.scrollY;
            heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });
}

// ============================================
// 15. SMOOTH REVEAL ANIMATIONS
// ============================================

function initRevealAnimations() {
    // Add intersection observer for sections
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, { threshold: 0.1 });
    
    DOM.sections.forEach(section => {
        sectionObserver.observe(section);
    });
}

// ============================================
// 16. TYPING EFFECT FOR HEADINGS
// ============================================

function initTypingEffect() {
    const glitchElements = document.querySelectorAll('.glitch');
    
    glitchElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            el.style.animation = 'none';
            el.offsetHeight; // Trigger reflow
            el.style.animation = '';
        });
    });
}

// ============================================
// 17. SOUND EFFECTS (Optional)
// ============================================

function initSoundEffects() {
    // Hover sounds can be added here
    // const hoverSound = new Audio('hover.mp3');
    // elements.forEach(el => {
    //     el.addEventListener('mouseenter', () => {
    //         hoverSound.currentTime = 0;
    //         hoverSound.play();
    //     });
    // });
}

// ============================================
// 18. MAGNETIC BUTTONS
// ============================================

function initMagneticButtons() {
    const buttons = document.querySelectorAll('.btn, .btn-play');
    
    buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            btn.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    });
}

// ============================================
// 19. RANDOM GLITCH EFFECT
// ============================================

function initRandomGlitch() {
    const logo = document.querySelector('.logo-glitch');
    
    if (logo) {
        setInterval(() => {
            logo.classList.add('glitching');
            setTimeout(() => {
                logo.classList.remove('glitching');
            }, 200);
        }, 5000);
    }
}

// ============================================
// 20. INITIALIZATION
// ============================================

function init() {
    // Add loading class to body
    document.body.classList.add('loading');
    
    // Initialize all features
    initPreloader();
    initCustomCursor();
    initNavigation();
    initScrollAnimations();
    initCounterAnimation();
    initGallery();
    initBackToTop();
    initWeaponTabs();
    initCardEffects();
    initParallax();
    initRevealAnimations();
    initTypingEffect();
    initMagneticButtons();
    initRandomGlitch();
    
    console.log('🎮 PUBG Website initialized successfully!');
}

// Run on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// ============================================
// ADDITIONAL INTERACTIVE FEATURES
// ============================================

// Smooth anchor scrolling for all links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Add ripple effect to buttons
document.querySelectorAll('.btn, .map-btn, .weapon-tab').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        ripple.style.cssText = `
            position: absolute;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            pointer-events: none;
            transform: scale(0);
            animation: ripple 0.6s linear;
            left: ${x}px;
            top: ${y}px;
            width: 100px;
            height: 100px;
            margin-left: -50px;
            margin-top: -50px;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple keyframe animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Mouse trail effect (subtle)
let trailInterval;
document.addEventListener('mousemove', (e) => {
    if (window.innerWidth <= 768) return;
    
    clearTimeout(trailInterval);
    trailInterval = setTimeout(() => {
        const trail = document.createElement('div');
        trail.className = 'mouse-trail';
        trail.style.cssText = `
            position: fixed;
            left: ${e.clientX}px;
            top: ${e.clientY}px;
            width: 5px;
            height: 5px;
            background: rgba(247, 147, 30, 0.5);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9998;
            animation: trailFade 0.5s forwards;
        `;
        
        document.body.appendChild(trail);
        setTimeout(() => trail.remove(), 500);
    }, 20);
});

const trailStyle = document.createElement('style');
trailStyle.textContent = `
    @keyframes trailFade {
        to {
            transform: scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(trailStyle);

// Easter egg - Konami code
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        document.body.style.animation = 'rainbow 2s infinite';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
        
        console.log('🏆 WINNER WINNER CHICKEN DINNER! 🍗');
    }
});

const rainbowStyle = document.createElement('style');
rainbowStyle.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(rainbowStyle);
