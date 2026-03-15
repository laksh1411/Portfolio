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
document.documentElement.setAttribute('data-theme', currentTheme);
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
        cursorGlow.style.background = 'radial-gradient(circle, var(--cursor-inner) 0%, transparent 60%)';
        cursorGlow.style.width = '500px';
        cursorGlow.style.height = '500px';
    });
    
    el.addEventListener('mouseleave', () => {
        cursorGlow.style.background = 'radial-gradient(circle, var(--cursor-outer) 0%, transparent 70%)';
        cursorGlow.style.width = '400px';
        cursorGlow.style.height = '400px';
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
// Updates a CSS variable on the card to track mouse position for a cool border effect
interactiveCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Set CSS variables for the pseudo-element 'before' border mask
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

// Update CSS to handle the dynamic mouse tracking border on cards
// We inject a small style tag to handle this dynamic pseudo-element effect
const style = document.createElement('style');
style.innerHTML = `
    .project-card::before {
        background: radial-gradient(
            800px circle at var(--mouse-x, 0) var(--mouse-y, 0),
            var(--accent-cyan),
            var(--accent-purple),
            transparent 40%
        );
    }
`;
document.head.appendChild(style);

// --- 5. Simple Glitch/Typing Effect on Load for Hero Text ---
// Optional: A small initialization sequence
window.addEventListener('DOMContentLoaded', () => {
    if(glitchText) {
        glitchText.style.opacity = '0';
        setTimeout(() => {
            glitchText.style.transition = 'opacity 1s ease';
            glitchText.style.opacity = '1';
        }, 300);
    }
});
