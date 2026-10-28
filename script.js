/* ============================================================
   BUSE CELIK — PORTFOLIO · Interactions
   ============================================================ */

(function () {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Local time (Ankara) ---------- */
  const clock = document.getElementById('clock');
  if (clock) {
    const fmt = new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Istanbul',
    });
    const tick = () => { clock.textContent = fmt.format(new Date()); };
    tick();
    setInterval(tick, 15000);
  }

  /* ---------- Rotating role ---------- */
  const roleEl = document.getElementById('typingText');
  let roles = typingTitles.en;
  let roleIdx = 0;

  function showRole(i) {
    roleEl.classList.remove('is-in');
    // Force reflow so the enter animation replays
    void roleEl.offsetWidth;
    roleEl.textContent = roles[i];
    roleEl.classList.add('is-in');
  }

  if (roleEl && !reduceMotion) {
    setInterval(() => {
      roleIdx = (roleIdx + 1) % roles.length;
      showRole(roleIdx);
    }, 2600);
  }

  // i18n hook: swap role list when the language changes
  window.__updateTypingTitles = (lang) => {
    roles = typingTitles[lang] || typingTitles.en;
    roleIdx = 0;
    if (roleEl) showRole(0);
  };

  /* ---------- Header state ---------- */
  const topbar = document.getElementById('topbar');
  const onScroll = () => topbar.classList.toggle('is-scrolled', window.scrollY > 12);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Mobile menu ---------- */
  const menuBtn = document.getElementById('menuBtn');
  const sheet = document.getElementById('sheet');

  function setMenu(open) {
    menuBtn.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('menu-open', open);
    if (open) {
      sheet.hidden = false;
      requestAnimationFrame(() => sheet.classList.add('is-open'));
    } else {
      sheet.classList.remove('is-open');
      setTimeout(() => { if (!sheet.classList.contains('is-open')) sheet.hidden = true; }, 300);
    }
  }

  menuBtn.addEventListener('click', () => setMenu(menuBtn.getAttribute('aria-expanded') !== 'true'));
  sheet.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setMenu(false)));

  /* ---------- Reveal on scroll ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  /* ---------- Stat counters ---------- */
  const stats = document.querySelector('.stats');
  if (stats && 'IntersectionObserver' in window && !reduceMotion) {
    const nums = stats.querySelectorAll('[data-count]');
    nums.forEach((n) => { n.textContent = '0'; });
    const co = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) return;
      co.disconnect();
      nums.forEach((n) => {
        const target = +n.dataset.count;
        const start = performance.now();
        const dur = 1100;
        const step = (t) => {
          const p = Math.min((t - start) / dur, 1);
          n.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      });
    }, { threshold: 0.4 });
    co.observe(stats);
  }

  /* ---------- Poster strip ---------- */
  const strip = document.getElementById('posters-strip');
  const page = (dir) => strip.scrollBy({ left: dir * strip.clientWidth * 0.8, behavior: reduceMotion ? 'auto' : 'smooth' });
  document.getElementById('postersPrev').addEventListener('click', () => page(-1));
  document.getElementById('postersNext').addEventListener('click', () => page(1));

  // Drag to scroll with a mouse; touch uses native scrolling
  let dragging = false;
  let moved = false;
  let startX = 0;
  let startScroll = 0;

  strip.addEventListener('pointerdown', (e) => {
    if (e.pointerType !== 'mouse') return;
    dragging = true;
    moved = false;
    startX = e.clientX;
    startScroll = strip.scrollLeft;
  });
  window.addEventListener('pointermove', (e) => {
    if (!dragging) return;
    const dx = e.clientX - startX;
    if (Math.abs(dx) > 4) {
      moved = true;
      strip.classList.add('is-dragging');
    }
    strip.scrollLeft = startScroll - dx;
  });
  window.addEventListener('pointerup', () => {
    dragging = false;
    strip.classList.remove('is-dragging');
  });
  strip.addEventListener('dragstart', (e) => e.preventDefault());

  /* ---------- Lightbox ---------- */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  let lastFocus = null;

  function openLightbox(src, alt) {
    lastFocus = document.activeElement;
    lightboxImg.src = src;
    lightboxImg.alt = alt;
    lightbox.hidden = false;
    document.body.classList.add('menu-open');
    requestAnimationFrame(() => lightbox.classList.add('is-open'));
    document.getElementById('lightboxClose').focus();
  }

  function closeLightbox() {
    lightbox.classList.remove('is-open');
    document.body.classList.remove('menu-open');
    setTimeout(() => { lightbox.hidden = true; lightboxImg.removeAttribute('src'); }, 250);
    if (lastFocus) lastFocus.focus();
  }

  strip.querySelectorAll('.poster').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      if (moved) { e.preventDefault(); moved = false; return; }
      const img = btn.querySelector('img');
      openLightbox(btn.dataset.full, img ? img.alt : '');
    });
  });

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.closest('#lightboxClose')) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    if (!lightbox.hidden) closeLightbox();
    else if (menuBtn.getAttribute('aria-expanded') === 'true') setMenu(false);
  });

  /* ---------- Language ---------- */
  if (window.__initLang) window.__initLang();
})();
