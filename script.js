/* ============================================================
   BUSE CELIK — PORTFOLIO · Interactions
   ============================================================ */

(function () {
  'use strict';

  const root = document.documentElement;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Hero name fades in once the script font is ready ---------- */
  const fontsReady = document.fonts ? document.fonts.ready : Promise.resolve();
  Promise.race([fontsReady, new Promise((r) => setTimeout(r, 1500))])
    .then(() => requestAnimationFrame(() => root.classList.add('is-ready')));

  /* ---------- Typing role ---------- */
  const roleEl = document.getElementById('typingText');
  let roles = typingTitles.en;
  let roleIdx = 0;
  let typingTimer = null;

  function typeLoop() {
    clearTimeout(typingTimer);
    if (!roleEl) return;
    if (reduceMotion) { roleEl.textContent = roles[0]; return; }
    const word = roles[roleIdx % roles.length];
    let n = roleEl.textContent && word.startsWith(roleEl.textContent) ? roleEl.textContent.length : 0;
    let deleting = false;
    const tick = () => {
      if (!deleting) {
        roleEl.textContent = word.slice(0, ++n);
        if (n >= word.length) { deleting = true; typingTimer = setTimeout(tick, 2200); return; }
        typingTimer = setTimeout(tick, 55);
      } else {
        roleEl.textContent = word.slice(0, --n);
        if (n <= 0) { roleIdx++; typingTimer = setTimeout(typeLoop, 250); return; }
        typingTimer = setTimeout(tick, 28);
      }
    };
    tick();
  }

  window.__updateTypingTitles = (lang) => {
    roles = typingTitles[lang] || typingTitles.en;
    roleIdx = 0;
    if (roleEl) roleEl.textContent = '';
    typeLoop();
  };

  /* ---------- Keycap title (letters as keyboard keys) ---------- */
  function buildKeys() {
    document.querySelectorAll('[data-keys]').forEach((el) => {
      const text = el.textContent.trim();
      el.setAttribute('aria-label', text);
      el.innerHTML = '';
      [...text].forEach((ch, i) => {
        const k = document.createElement('span');
        k.setAttribute('aria-hidden', 'true');
        if (ch === ' ') { k.className = 'key key--gap'; } else {
          k.className = 'key';
          k.textContent = ch;
          k.style.setProperty('--r', ((i * 37) % 11 - 5) + 'deg');
          k.style.setProperty('--ty', ((i * 53) % 9 - 4) + 'px');
        }
        k.style.setProperty('--i', i);
        el.appendChild(k);
      });
    });
  }

  /* ---------- Reveal on scroll ---------- */
  const io = 'IntersectionObserver' in window && !reduceMotion
    ? new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' })
    : null;

  function observe(els) {
    els.forEach((el) => {
      if (io) io.observe(el);
      else el.classList.add('is-in');
    });
  }
  observe(document.querySelectorAll('.reveal, .beads, [data-keys]'));

  /* ---------- Counters ---------- */
  const counters = document.querySelectorAll('[data-count]');
  const countIO = 'IntersectionObserver' in window && !reduceMotion
    ? new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const target = +el.dataset.count;
        const start = performance.now();
        const step = (t) => {
          const p = Math.min((t - start) / 1200, 1);
          el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        countIO.unobserve(el);
      });
    }, { threshold: 0.6 })
    : null;
  if (countIO) counters.forEach((c) => countIO.observe(c));

  /* ---------- Scroll: topbar + spinning burst ---------- */
  const topbar = document.getElementById('topbar');
  const burst = document.querySelector('.burst');
  let ticking = false;
  function onScroll() {
    const y = window.scrollY;
    topbar.classList.toggle('is-scrolled', y > 10);
    if (burst && !reduceMotion) burst.style.setProperty('--rot', (y * 0.04).toFixed(2) + 'deg');
    ticking = false;
  }
  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
  onScroll();

  /* ---------- Project dialog ---------- */
  const modal = document.getElementById('modal');
  const modalBody = document.getElementById('modalBody');
  let openId = null;
  let lastFocus = null;

  function fillModal() {
    const src = document.getElementById(openId);
    if (!src) return;
    const clone = src.cloneNode(true);
    clone.removeAttribute('id');
    clone.hidden = false;
    modalBody.replaceChildren(clone);
  }

  function openModal(id) {
    openId = id;
    lastFocus = document.activeElement;
    fillModal();
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    modal.querySelector('.modal__close').focus();
    modal.querySelector('.modal__card').scrollTop = 0;
  }

  function closeModal() {
    if (modal.hidden) return;
    modal.hidden = true;
    openId = null;
    modalBody.replaceChildren();
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  }

  document.addEventListener('click', (e) => {
    const opener = e.target.closest('[data-open]');
    if (opener) { openModal(opener.dataset.open); return; }
    if (e.target.closest('[data-close]')) closeModal();
  });

  /* ---------- Posters: drag to scroll + lightbox ---------- */
  const strip = document.getElementById('posters-strip');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');

  if (strip) {
    let down = false; let moved = false; let startX = 0; let startScroll = 0;
    strip.addEventListener('pointerdown', (e) => {
      if (e.pointerType !== 'mouse') return;
      down = true; moved = false; startX = e.clientX; startScroll = strip.scrollLeft;
    });
    window.addEventListener('pointermove', (e) => {
      if (!down) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 5) { moved = true; strip.classList.add('is-drag'); }
      strip.scrollLeft = startScroll - dx;
    });
    window.addEventListener('pointerup', () => {
      down = false;
      strip.classList.remove('is-drag');
    });

    strip.addEventListener('click', (e) => {
      const p = e.target.closest('.poster');
      if (!p) return;
      if (moved) { moved = false; return; }
      lightboxImg.src = p.dataset.full;
      lightbox.hidden = false;
    });

    const by = (dir) => strip.scrollBy({ left: dir * strip.clientWidth * 0.7, behavior: reduceMotion ? 'auto' : 'smooth' });
    document.getElementById('postersPrev').addEventListener('click', () => by(-1));
    document.getElementById('postersNext').addEventListener('click', () => by(1));
  }

  function closeLightbox() {
    lightbox.hidden = true;
    lightboxImg.removeAttribute('src');
  }
  document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    if (!lightbox.hidden) closeLightbox();
    else closeModal();
  });

  /* ---------- After a language switch ---------- */
  window.__afterTranslate = () => {
    buildKeys();
    document.querySelectorAll('[data-keys]').forEach((el) => {
      if (!io) el.classList.add('is-in');
    });
    if (openId) fillModal();
  };

  buildKeys();
  window.__initLang();
})();
