// ===== NAVBAR SCROLL =====
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('header--scrolled');
    } else {
        header.classList.remove('header--scrolled');
    }
});

// ===== MENÚ MÓVIL =====
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    const isOpen = navToggle.classList.toggle('nav__toggle--active');
    navMenu.classList.toggle('nav__menu--active');
    navToggle.setAttribute('aria-expanded', isOpen);
    navToggle.setAttribute('aria-label', isOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación');
});

document.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('nav__toggle--active');
        navMenu.classList.remove('nav__menu--active');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', 'Abrir menú de navegación');
    });
});

// ===== ANIMACIONES AL SCROLL (stagger por sección) =====
const animateElements = document.querySelectorAll('.animate');

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            // Stagger: buscar hermanos animados en la misma sección
            const parent = entry.target.closest('.section, .hero, .fiverr, .footer');
            if (parent) {
                const siblings = parent.querySelectorAll('.animate:not(.animate--visible)');
                siblings.forEach((el, i) => {
                    setTimeout(() => el.classList.add('animate--visible'), i * 120);
                });
            } else {
                entry.target.classList.add('animate--visible');
            }
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.08,
    rootMargin: '0px 0px -60px 0px'
});

animateElements.forEach(el => observer.observe(el));

// ===== PARALLAX SUAVE EN HERO =====
const heroImage = document.querySelector('.hero__image-wrapper');
const heroContent = document.querySelector('.hero__content');

window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    if (scrolled < window.innerHeight) {
        const speed = scrolled * 0.15;
        if (heroImage) heroImage.style.transform = `translateY(${speed}px)`;
        if (heroContent) heroContent.style.transform = `translateY(${speed * 0.5}px)`;
    }
});

// ===== EFECTO TYPING EN HERO =====
const titles = ['Desarrolladora Web', 'Diseñadora WordPress', 'Freelance Creativa'];
const heroTitle = document.querySelector('.hero__title');
let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    if (!heroTitle) return;
    const current = titles[titleIndex];

    if (isDeleting) {
        heroTitle.textContent = current.substring(0, charIndex - 1);
        charIndex--;
    } else {
        heroTitle.textContent = current.substring(0, charIndex + 1);
        charIndex++;
    }

    let speed = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === current.length) {
        speed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
        speed = 400;
    }

    setTimeout(typeEffect, speed);
}

setTimeout(typeEffect, 1500);

// ===== CURSOR GLOW (solo desktop) =====
if (window.innerWidth > 768) {
    const glow = document.createElement('div');
    glow.classList.add('cursor-glow');
    document.body.appendChild(glow);

    document.addEventListener('mousemove', (e) => {
        glow.style.left = e.clientX + 'px';
        glow.style.top = e.clientY + 'px';
    });
}

// ===== ACTIVE NAV LINK ON SCROLL + PROGRESS BAR =====
const sections = document.querySelectorAll('section[id]');
const progressBar = document.querySelector('.scroll-progress');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 100;
    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        const link = document.querySelector(`.nav__link[href="#${id}"]`);
        if (link) {
            if (scrollY >= top && scrollY < top + height) {
                link.classList.add('nav__link--active');
            } else {
                link.classList.remove('nav__link--active');
            }
        }
    });

    // Progress bar
    if (progressBar) {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = Math.round((window.scrollY / totalHeight) * 100);
        progressBar.style.width = progress + '%';
        progressBar.setAttribute('aria-valuenow', progress);
    }
});
