/* =========================================================
   PORTFOLIO WEBSITE — script.js
   Seif Elislam Ahmed & Omar Elhossainy
========================================================= */

'use strict';

// ─────────────────────────────────────────────────────────
// 1. TYPING ANIMATION
// ─────────────────────────────────────────────────────────
(function initTyping() {
    const el = document.getElementById('typed-text');
    const text = 'Transforming Data into Intelligent AI Solutions';
    const speed = 80; // ms per character
    let i = 0;

    function typeChar() {
        if (i < text.length) {
            el.textContent += text.charAt(i++);
            setTimeout(typeChar, speed);
        }
    }

    // Start after a short delay so the page has rendered
    window.addEventListener('load', () => setTimeout(typeChar, 400));
})();


// ─────────────────────────────────────────────────────────
// 2. STICKY NAVBAR — frosted glass on scroll
// ─────────────────────────────────────────────────────────
(function initNavbar() {
    const navbar = document.getElementById('navbar');
    const heroEl = document.getElementById('home');
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section[id]');

    function onScroll() {
        // Glassmorphism once we've scrolled past the hero height
        const heroBottom = heroEl ? heroEl.offsetHeight : 120;
        navbar.classList.toggle('scrolled', window.scrollY > heroBottom * 0.6);

        // Active link highlighting
        let current = '';
        sections.forEach(sec => {
            if (window.scrollY >= sec.offsetTop - 120) {
                current = sec.id;
            }
        });
        navLinks.forEach(a => {
            a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
        });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run once on load
})();


// ─────────────────────────────────────────────────────────
// 3. HAMBURGER MENU (mobile)
// ─────────────────────────────────────────────────────────
(function initMobileMenu() {
    const btn = document.getElementById('navToggle');
    const links = document.querySelector('.nav-links');

    if (!btn || !links) return;

    btn.addEventListener('click', () => {
        links.classList.toggle('open');
        btn.classList.toggle('open');
    });

    // Close on link click
    links.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => links.classList.remove('open'));
    });
})();


// ─────────────────────────────────────────────────────────
// 4. SCROLL FADE-IN — Intersection Observer
// ─────────────────────────────────────────────────────────
(function initScrollReveal() {
    const elements = document.querySelectorAll('.fade-in-up');

    function reveal(el) {
        el.classList.add('visible');
        observer.unobserve(el);
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) reveal(entry.target);
            });
        },
        { threshold: 0.05, rootMargin: '0px 0px -20px 0px' }
    );

    elements.forEach(el => observer.observe(el));

    // Immediately reveal anything already visible in viewport on load
    function revealVisible() {
        elements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                reveal(el);
            }
        });
    }

    // Run on DOM-ready and after a short delay
    revealVisible();
    setTimeout(revealVisible, 300);

    // Safety fallback: reveal ALL after 2s in case observer didn't fire
    setTimeout(() => {
        elements.forEach(el => el.classList.add('visible'));
    }, 2000);
})();


// ─────────────────────────────────────────────────────────
// 5. FLOATING PARTICLES (hero background)
// ─────────────────────────────────────────────────────────
(function initParticles() {
    const container = document.getElementById('particles');
    if (!container) return;

    const COUNT = 28;

    for (let i = 0; i < COUNT; i++) {
        const p = document.createElement('div');
        p.className = 'particle';

        const size = Math.random() * 3 + 1;        // 1–4 px
        const left = Math.random() * 100;           // % across
        const duration = Math.random() * 14 + 8;        // 8–22s
        const delay = Math.random() * 12;             // 0–12s
        const hue = Math.random() > 0.5 ? '#00D4FF' : '#6C63FF';

        p.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${left}%;
      bottom: -10px;
      background: ${hue};
      animation-duration: ${duration}s;
      animation-delay:    ${delay}s;
      box-shadow: 0 0 ${size * 3}px ${hue};
    `;

        container.appendChild(p);
    }
})();


// ─────────────────────────────────────────────────────────
// 6. CONTACT FORM — prevent default, show friendly confirm
// ─────────────────────────────────────────────────────────
(function initContactForm() {
    const form = document.getElementById('contactForm');
    const btn = document.getElementById('submitBtn');

    if (!form || !btn) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Visual feedback
        btn.textContent = "\u2713 Sent! We'll be in touch.";
        btn.style.background = 'linear-gradient(90deg, #1a8866, #00D4FF)';
        btn.disabled = true;

        // Reset after 4s
        setTimeout(() => {
            btn.textContent = 'Get in Touch';
            btn.style.background = '';
            btn.disabled = false;
            form.reset();
        }, 4000);
    });
})();


// ─────────────────────────────────────────────────────────
// 7. SMOOTH SCROLL (fallback for older browsers)
// ─────────────────────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});
