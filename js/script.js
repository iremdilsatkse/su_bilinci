// SLIDER BAŞLANGIÇ
const container = document.querySelector('.image-container');
const beforeImage = document.querySelector('.before-image');
const slider = document.querySelector('.slider-handle');
const heroVideoNew = document.querySelector('.hero-video-new');

let isDragging = false;
let animationId = null;

// Slider başlangıç pozisyonu
beforeImage.style.clipPath = 'inset(0 50% 0 0)';
slider.style.left = '50%';

// Mouse ve dokunma olayları hem slider hem container üzerinde
function moveSlider(x) {
    const containerRect = container.getBoundingClientRect();
    let percent = ((x - containerRect.left) / containerRect.width) * 100;
    percent = Math.max(0, Math.min(100, percent));
    beforeImage.style.clipPath = `inset(0 ${100 - percent}% 0 0)`;
    slider.style.left = `${percent}%`;

    // Video opacity (isteğe bağlı)
    if (heroVideoNew) {
        let opacity = 0;
        if (percent > 50) {
            opacity = (percent - 50) / 60;
            if (opacity > 1) opacity = 1;
        }
        heroVideoNew.style.opacity = opacity;
    }
}

// Mouse olayları
container.addEventListener('mousedown', (e) => {
    isDragging = true;
    moveSlider(e.clientX);
    e.preventDefault();
});
document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    if (animationId) cancelAnimationFrame(animationId);
    animationId = requestAnimationFrame(() => moveSlider(e.clientX));
});
document.addEventListener('mouseup', () => {
    isDragging = false;
    if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
    }
});

// Dokunma olayları
container.addEventListener('touchstart', (e) => {
    isDragging = true;
    moveSlider(e.touches[0].clientX);
    e.preventDefault();
});
container.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    if (animationId) cancelAnimationFrame(animationId);
    animationId = requestAnimationFrame(() => moveSlider(e.touches[0].clientX));
});
container.addEventListener('touchend', () => {
    isDragging = false;
    if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
    }
});
// SLIDER SON

// NAVBAR BAŞLANGIÇ
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', function(e) {
        navMenu.classList.toggle('active');
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        e.stopPropagation();
    });

    // Menü dışına tıklayınca kapansın
    document.addEventListener('click', function(e) {
        if (navMenu.classList.contains('active') &&
            !navMenu.contains(e.target) &&
            !menuToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}
// NAVBAR SON

// Smooth scroll
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
        // Menü mobilde kapansın
        if (window.innerWidth <= 1024 && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Scroll animasyonları (observer varsa)
if (window.IntersectionObserver) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.tip-card, .stat-card, .benefits-list li').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
}

// Ripple effect
function createRipple(event) {
    const element = event.currentTarget;
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    const ripple = document.createElement('span');
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    `;
    element.appendChild(ripple);
    setTimeout(() => {
        ripple.remove();
    }, 600);
}
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple-animation {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
document.querySelectorAll('.tip-card, .stat-card').forEach(element => {
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.addEventListener('click', createRipple);
});

// Parallax hero
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero');
    const speed = scrolled * 0.5;
    if (parallax) {
        parallax.style.transform = `translateY(${speed}px)`;
    }
});


// Konsol logu
console.log('Su Bilinci Websitesi Yüklendi! 💧');
