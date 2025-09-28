
const container = document.querySelector('.image-container');
const beforeImage = document.querySelector('.before-image');
const slider = document.querySelector('.slider-handle');
const heroVideoNew = document.querySelector('.hero-video-new');

let isDragging = false;
let animationId = null; // Performans için requestAnimationFrame

// Başlangıçta ortada başlasın
beforeImage.style.clipPath = 'inset(0 50% 0 0)';
slider.style.left = '50%';

slider.addEventListener('mousedown', () => {
    isDragging = true;
});

document.addEventListener('mouseup', () => {
    isDragging = false;
    if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
    }
});


// Slider hareketinde video opacity'sini güncelle
document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;

    if (animationId) {
        cancelAnimationFrame(animationId);
    }

    animationId = requestAnimationFrame(() => {
        const containerRect = container.getBoundingClientRect();
        const x = e.clientX - containerRect.left;
        let percent = (x / containerRect.width) * 100;

        percent = Math.max(0, Math.min(100, percent));

        beforeImage.style.clipPath = `inset(0 ${100 - percent}% 0 0)`;
        slider.style.left = `${percent}%`;

        // Video opacity: %50'den sonra yavaşça görünür
        if (heroVideoNew) {
            let opacity = 0;
            if (percent > 50) {
                opacity = (percent - 50) / 60;
                if (opacity > 1) opacity = 1;
            }
            heroVideoNew.style.opacity = opacity;
        }
    });
});

// Sayfa yüklendiğinde görselleri yükle
window.addEventListener('load', loadImages);


// Smooth scrolling for navigation links
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



// Observe elements for animation
document.querySelectorAll('.tip-card, .stat-card, .benefits-list li').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

// Add ripple effect to buttons and cards
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

// Add ripple animation CSS
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

// Add ripple effect to interactive elements
document.querySelectorAll('.tip-card, .stat-card').forEach(element => {
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.addEventListener('click', createRipple);
});

// Dynamic water drops animation
function createWaterDrop() {
    const dropsContainer = document.querySelector('.water-drops');
    const drop = document.createElement('div');
    drop.className = 'drop';
    
    const leftPosition = Math.random() * 100;
    const animationDuration = 2 + Math.random() * 3;
    const delay = Math.random() * 2;
    
    drop.style.cssText = `
        left: ${leftPosition}%;
        animation: fall ${animationDuration}s linear ${delay}s infinite;
    `;
    
    dropsContainer.appendChild(drop);
    
    setTimeout(() => {
        drop.remove();
    }, (animationDuration + delay) * 1000);
}

// Create water drops periodically
setInterval(createWaterDrop, 500);


// Add scroll-triggered animations for better UX
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero');
    const speed = scrolled * 0.5;
    
    if (parallax) {
        parallax.style.transform = `translateY(${speed}px)`;
    }
});

// Mobile menu toggle (if needed)
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('active');
}

// Enhanced input validation and formatting
Object.values(inputs).forEach(input => {
    input.addEventListener('input', function() {
        let value = parseInt(this.value);
        const max = parseInt(this.getAttribute('max'));
        const min = parseInt(this.getAttribute('min'));
        
        if (this.value === "") {
            // boş bırakılmasına izin ver
            calculateWaterUsage();
            return;
        }

        if (value > max) {
            this.value = max;
        } else if (value < min) {
            this.value = min;
        }
        
        calculateWaterUsage();
    });
    
    // Add focus and blur effects
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'scale(1.02)';
        this.parentElement.style.transition = 'transform 0.2s ease';
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'scale(1)';
    });
});



console.log('Su Bilinci Websitesi Yüklendi! 💧');