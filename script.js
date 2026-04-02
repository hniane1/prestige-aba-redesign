// === PRELOADER ===
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('preloader').classList.add('hide');
    }, 800);
});

// === SMOOTH SCROLL ===
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        e.preventDefault();
        const t = document.querySelector(a.getAttribute('href'));
        if (t) {
            const offset = document.querySelector('.navbar').offsetHeight + 20;
            window.scrollTo({ top: t.offsetTop - offset, behavior: 'smooth' });
            // Close mobile menu
            document.getElementById('navLinks')?.classList.remove('active');
            document.getElementById('mobileToggle')?.classList.remove('active');
        }
    });
});

// === NAVBAR SCROLL ===
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('backToTop');
const topbarH = document.querySelector('.topbar')?.offsetHeight || 32;

window.addEventListener('scroll', () => {
    const y = window.pageYOffset;
    navbar.classList.toggle('scrolled', y > topbarH);
    backToTop.classList.toggle('show', y > 400);
});

// === BACK TO TOP ===
backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// === MOBILE MENU ===
const mobileToggle = document.getElementById('mobileToggle');
const navLinks = document.getElementById('navLinks');
mobileToggle?.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileToggle.classList.toggle('active');
});

// === FAQ ACCORDION ===
document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
        const item = btn.parentElement;
        const wasActive = item.classList.contains('active');
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
        if (!wasActive) item.classList.add('active');
    });
});

// === FORM ===
document.getElementById('contactForm')?.addEventListener('submit', e => {
    e.preventDefault();
    alert('Thank you! We will contact you within 24 hours to schedule your consultation.');
    e.target.reset();
});

// === INTERSECTION OBSERVER — FADE UP ===
const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -80px 0px' });

document.querySelectorAll(
    '.about-card, .service-card, .why-card, .team-card, .testimonial-card, .insurance-card, .process-step, .trust-item, .faq-item'
).forEach(el => {
    el.classList.add('fade-up');
    obs.observe(el);
});

// === COUNTING ANIMATION ===
const countObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            if (el.dataset.animated) return;
            el.dataset.animated = '1';
            const end = parseInt(el.dataset.count);
            const dur = 2000;
            let start = 0;
            const step = (ts) => {
                if (!start) start = ts;
                const p = Math.min((ts - start) / dur, 1);
                // ease out quad
                const ease = 1 - (1 - p) * (1 - p);
                el.textContent = Math.floor(ease * end);
                if (p < 1) requestAnimationFrame(step);
                else el.textContent = end;
            };
            requestAnimationFrame(step);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('[data-count]').forEach(el => countObs.observe(el));

// === PARTICLES (subtle floating dots in hero) ===
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
const particlesContainer = document.getElementById('particles');
if (particlesContainer) {
    particlesContainer.appendChild(canvas);
    canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;';

    let particles = [];
    const resize = () => {
        canvas.width = particlesContainer.offsetWidth;
        canvas.height = particlesContainer.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < 50; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 2 + 1,
            dx: (Math.random() - 0.5) * 0.5,
            dy: (Math.random() - 0.5) * 0.5,
            o: Math.random() * 0.3 + 0.1,
        });
    }

    const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.x += p.dx; p.y += p.dy;
            if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(59, 169, 156, ${p.o})`;
            ctx.fill();
        });
        // Draw lines between close particles
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx*dx + dy*dy);
                if (dist < 120) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(59, 169, 156, ${0.08 * (1 - dist/120)})`;
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animate);
    };
    animate();
}

console.log('✨ Prestige ABA Therapy — Redesigned');