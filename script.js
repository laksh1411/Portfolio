// --- 1. Theme Toggle Logic ---
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('i');
const platformIcons = document.querySelectorAll('.platform-icon');
const cursorGlow = document.getElementById('cursorGlow');
const navbar = document.querySelector('.navbar');
const interactiveCards = document.querySelectorAll('.interactive-card');
const observerElements = document.querySelectorAll('.observer-hidden');
const glitchText = document.querySelector('.glitch-text');

// Initialize theme
const currentTheme = localStorage.getItem('theme') || 'dark';
// document.documentElement.setAttribute('data-theme', currentTheme); // Handled in head script
updateThemeIcon(currentTheme);
updatePlatformIcons(currentTheme);

themeToggle.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');
    let nextTheme = theme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('theme', nextTheme);
    updateThemeIcon(nextTheme);
    updatePlatformIcons(nextTheme);
});

// Mobile Menu Logic
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');
const mobileMenuIcon = mobileMenuBtn.querySelector('i');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    if (navLinks.classList.contains('active')) {
        mobileMenuIcon.classList.replace('fa-bars', 'fa-xmark');
    } else {
        mobileMenuIcon.classList.replace('fa-xmark', 'fa-bars');
    }
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuIcon.classList.replace('fa-xmark', 'fa-bars');
    });
});

function updateThemeIcon(theme) {
    if (theme === 'light') {
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    } else {
        themeIcon.classList.replace('fa-sun', 'fa-moon');
    }
}

function updatePlatformIcons(theme) {
    platformIcons.forEach(icon => {
        if (theme === 'light') {
            icon.classList.remove('filter-invert');
        } else {
            icon.classList.add('filter-invert');
        }
    });
}

// --- 2. Custom Cursor Glow Effect ---
// ... (rest of the code)
// Creates a glowing orb that follows the mouse cursor
document.addEventListener('mousemove', (e) => {
    // Update position
    const x = e.clientX;
    const y = e.clientY;
    
    // Smooth trailing effect could be added with requestAnimationFrame, 
    // but a direct transform is snappy and performant.
    cursorGlow.style.transform = `translate(calc(${x}px - 50%), calc(${y}px - 50%))`;
});

// Change glow color when hovering over interactive elements (links, buttons, cards)
const interactiveElements = document.querySelectorAll('a, button, .interactive-card');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorGlow.style.background = 'radial-gradient(circle, var(--accent-gold) 0%, transparent 60%)';
        cursorGlow.style.width = '500px';
        cursorGlow.style.height = '500px';
        cursorGlow.style.opacity = '0.35';
    });
    
    el.addEventListener('mouseleave', () => {
        cursorGlow.style.background = 'radial-gradient(circle, var(--cursor-outer) 0%, transparent 70%)';
        cursorGlow.style.width = '400px';
        cursorGlow.style.height = '400px';
        cursorGlow.style.opacity = '0.15';
    });
});


// --- 2. Navbar Scroll Effect ---
// Changes navbar styling when scrolling down
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});


// --- 3. Scroll Reveal Animation (Intersection Observer) ---
// Fades in elements as they enter the viewport
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15 // Trigger when 15% of element is visible
};

const sectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('observer-visible');
            entry.target.classList.remove('observer-hidden');
            // Stop observing once animated
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

observerElements.forEach(el => {
    sectionObserver.observe(el);
});


// --- 4. Dynamic Hover Glow on Project Cards ---
// ... (previous logic for project cards)

// --- 5. Scroll Progress Indicator ---
window.addEventListener('scroll', () => {
    const scrollProgress = document.getElementById('scrollProgress');
    if (scrollProgress) {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        scrollProgress.style.width = scrolled + "%";
    }
});

// Observe more elements for reveal
document.querySelectorAll('.project-card, .skill-category, .cert-card, .experience-item').forEach(el => {
    el.classList.add('observer-hidden');
    sectionObserver.observe(el);
});

// --- 6. Preloader Removal ---
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        // Minimum display time to ensure user sees the animation
        setTimeout(() => {
            preloader.classList.add('fade-out');
            setTimeout(() => {
                preloader.remove();
            }, 800);
        }, 1000);
    }
});
