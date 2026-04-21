// ============================================
// MJ-X / MiracleJet - JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', () => {

    // ---------- HAMBURGER MENU ----------
    const hamburger = document.getElementById('hamburger');
    const navMobile = document.getElementById('navMobile');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMobile.classList.toggle('open');
        document.body.style.overflow = navMobile.classList.contains('open') ? 'hidden' : '';
    });

    navMobile.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMobile.classList.remove('open');
            document.body.style.overflow = '';
        });
    });

    // ---------- HEADER SCROLL ----------
    const header = document.querySelector('.header');
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        header.classList.toggle('scrolled', scrollY > 50);
        backToTop.classList.toggle('visible', scrollY > 600);
    });

    // ---------- SMOOTH SCROLL ----------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 72;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // ---------- SCROLL ANIMATIONS ----------
    const animatedElements = document.querySelectorAll(
        '.feature-card, .about-card, .review-card, .maint-card, .product-card, .timeline-item'
    );

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const siblings = Array.from(entry.target.parentElement.children);
                const delay = siblings.indexOf(entry.target) * 80;
                setTimeout(() => entry.target.classList.add('visible'), delay);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    animatedElements.forEach(el => observer.observe(el));

    // ---------- GALLERY LIGHTBOX ----------
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            const caption = item.querySelector('.gallery-caption');

            const lightbox = document.createElement('div');
            lightbox.style.cssText = `
                position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,.92);
                display:flex;align-items:center;justify-content:center;flex-direction:column;gap:16px;
                cursor:pointer;padding:40px;animation:fadeIn .3s ease;
            `;

            const lbImg = document.createElement('img');
            const largeSrc = img.src.replace('_mini', '_L').replace('mini.jpg', 'L.jpg');
            lbImg.src = largeSrc;
            lbImg.onerror = () => { lbImg.src = img.src; };
            lbImg.style.cssText = 'max-width:90%;max-height:80vh;object-fit:contain;border-radius:8px;';

            const lbCaption = document.createElement('p');
            lbCaption.textContent = caption ? caption.textContent : '';
            lbCaption.style.cssText = 'color:rgba(255,255,255,.7);font-size:.9rem;';

            const closeBtn = document.createElement('button');
            closeBtn.innerHTML = '&times;';
            closeBtn.style.cssText = 'position:absolute;top:20px;right:24px;background:none;border:none;color:#fff;font-size:2.5rem;cursor:pointer;line-height:1;';

            lightbox.append(closeBtn, lbImg, lbCaption);
            document.body.appendChild(lightbox);
            document.body.style.overflow = 'hidden';

            const closeLightbox = () => { lightbox.remove(); document.body.style.overflow = ''; };
            lightbox.addEventListener('click', (e) => { if (e.target === lightbox || e.target === closeBtn) closeLightbox(); });
            document.addEventListener('keydown', function esc(e) { if (e.key === 'Escape') { closeLightbox(); document.removeEventListener('keydown', esc); } });
        });
    });

    // ---------- NEWS SCROLL DUPLICATE ----------
    const newsItems = document.querySelector('.news-items');
    if (newsItems && window.innerWidth > 480) {
        newsItems.innerHTML += newsItems.innerHTML;
    }

    // ---------- HERO PARTICLES ----------
    const canvas = document.getElementById('particles');
    if (canvas) {
        const particleCount = 30;
        const particles = [];

        for (let i = 0; i < particleCount; i++) {
            const dot = document.createElement('div');
            const size = Math.random() * 3 + 1;
            dot.style.cssText = `
                position:absolute;width:${size}px;height:${size}px;border-radius:50%;
                background:rgba(200,164,92,${Math.random() * .3 + .1});
                left:${Math.random() * 100}%;top:${Math.random() * 100}%;
                animation:particleFloat ${Math.random() * 10 + 10}s ease-in-out infinite;
                animation-delay:${Math.random() * -10}s;
            `;
            canvas.appendChild(dot);
        }

        const style = document.createElement('style');
        style.textContent = `
            @keyframes particleFloat {
                0%, 100% { transform: translate(0, 0); }
                25% { transform: translate(${Math.random()*40-20}px, ${Math.random()*40-20}px); }
                50% { transform: translate(${Math.random()*40-20}px, ${Math.random()*40-20}px); }
                75% { transform: translate(${Math.random()*40-20}px, ${Math.random()*40-20}px); }
            }
        `;
        document.head.appendChild(style);
    }

});
