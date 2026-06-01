// ============================================
// NAVIGATION & HAMBURGER MENU
// ============================================

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// ============================================
// SMOOTH SCROLL & ACTIVE NAVIGATION
// ============================================

const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ============================================
// FORM VALIDATION & SUBMISSION
// ============================================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const name = this.children[0].children[0].value;
        const email = this.children[1].children[0].value;
        const message = this.children[2].children[0].value;

        // Basic validation
        if (!name || !email || !message) {
            showNotification('Semua field harus diisi!', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showNotification('Email tidak valid!', 'error');
            return;
        }

        // Simulate form submission
        showNotification('Pesan berhasil dikirim! Terima kasih telah menghubungi saya.', 'success');
        this.reset();
    });
}

// Email validation
function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Show notification
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 15px 25px;
        background: ${type === 'success' ? '#39ff14' : '#ff006e'};
        color: ${type === 'success' ? '#1a1a2e' : '#fff'};
        border-radius: 8px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideIn 0.3s ease;
        font-weight: 600;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ============================================
// SCROLL ANIMATIONS
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe skill cards and portfolio cards
document.querySelectorAll('.skill-card, .portfolio-card, .stat').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// ============================================
// NAVBAR BACKGROUND ON SCROLL
// ============================================

const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(15, 52, 96, 0.98)';
        navbar.style.boxShadow = '0 5px 20px rgba(157, 78, 221, 0.2)';
    } else {
        navbar.style.background = 'rgba(15, 52, 96, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// ============================================
// PORTFOLIO CARD INTERACTIONS
// ============================================

const portfolioCards = document.querySelectorAll('.portfolio-card');

portfolioCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ============================================
// SKILL CARD HOVER EFFECT
// ============================================

const skillCards = document.querySelectorAll('.skill-card');

skillCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) rotateY(5deg)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) rotateY(0)';
    });
});

// ============================================
// TYPING ANIMATION FOR HERO
// ============================================

function typeAnimation() {
    const titleElement = document.querySelector('.hero-title');
    if (!titleElement) return;

    const text = titleElement.textContent;
    titleElement.textContent = '';
    let index = 0;

    function type() {
        if (index < text.length) {
            titleElement.textContent += text.charAt(index);
            index++;
            setTimeout(type, 50);
        }
    }

    type();
}

// Run typing animation when page loads
window.addEventListener('load', () => {
    typeAnimation();
});

// ============================================
// PARALLAX EFFECT
// ============================================

window.addEventListener('scroll', () => {
    const heroShape = document.querySelector('.hero-shape');
    if (heroShape) {
        heroShape.style.transform = `translateY(${window.scrollY * 0.5}px)`;
    }
});

// ============================================
// RIPPLE EFFECT ON BUTTONS
// ============================================

const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            left: ${x}px;
            top: ${y}px;
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;

        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// ============================================
// COUNTER ANIMATION
// ============================================

const stats = document.querySelectorAll('.stat h3');

function animateCounters() {
    stats.forEach(stat => {
        const target = parseInt(stat.textContent);
        if (isNaN(target)) return;

        let count = 0;
        const increment = target / 30;

        const counter = setInterval(() => {
            count += increment;
            if (count >= target) {
                stat.textContent = target + (stat.textContent.includes('+') ? '+' : '');
                clearInterval(counter);
            } else {
                stat.textContent = Math.floor(count) + (stat.textContent.includes('+') ? '+' : '%');
            }
        }, 50);
    });
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelector('.about-stats') && statsObserver.observe(document.querySelector('.about-stats'));

// ============================================
// CSS ANIMATIONS KEYFRAMES (via JS)
// ============================================

const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }

    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ============================================
// UTILITY: DEBOUNCE FUNCTION
// ============================================

function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

// ============================================
// DYNAMIC YEAR IN FOOTER
// ============================================

const footerYear = document.querySelector('.footer p');
if (footerYear) {
    const year = new Date().getFullYear();
    footerYear.textContent = footerYear.textContent.replace('2024', year);
}

console.log('Portfolio script loaded successfully! 🚀');
