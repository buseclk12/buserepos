/* ============================================================
   BUSE CELIK — PORTFOLIO · Interactions
   ============================================================ */

(function () {
  'use strict';

  const root = document.documentElement;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const clamp = (v, a, b) => Math.min(Math.max(v, a), b);

  /* ---------- Text splitting (words / chars, masked) ---------- */
  function splitNode(el, mode) {
    let i = 0;
    const walk = (node) => {
      [...node.childNodes].forEach((child) => {
        if (child.nodeType === 3) {
          const frag = document.createDocumentFragment();
          child.textContent.split(/(\s+)/).forEach((part) => {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(' ')); return; }
            const word = document.createElement('span');
            word.className = 'w';
            if (mode === 'chars') {
              [...part].forEach((ch) => {
                const c = document.createElement('span');
                c.className = 'w__i';
                c.style.setProperty('--i', i++);
                c.textContent = ch;
                word.appendChild(c);
              });
            } else {
              const inner = document.createElement('span');
              inner.className = 'w__i';
              inner.style.setProperty('--i', i++);
              inner.textContent = part;
              word.appendChild(inner);
            }
            frag.appendChild(word);
          });
          child.replaceWith(frag);
        } else if (child.nodeType === 1 && !child.classList.contains('w')) {
          walk(child);
        }
      });
    };
    walk(el);
  }

  function splitAll() {
    document.querySelectorAll('[data-split]').forEach((el) => {
      if (el.querySelector('.w')) return;
      splitNode(el, el.dataset.split);
    });
  }
  splitAll();

  const splitIO = 'IntersectionObserver' in window
    ? new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('is-in'); splitIO.unobserve(e.target); }
      });
    }, { threshold: 0.2 })
    : null;

  document.querySelectorAll('[data-split]').forEach((el) => {
    if (el.closest('.cover__name')) return; // the hero waits for the loader
    if (splitIO && !reduceMotion) splitIO.observe(el);
    else el.classList.add('is-in');
  });

  /* ---------- Loader ---------- */
  const loader = document.getElementById('loader');
  const heroName = document.querySelectorAll('.cover__name [data-split]');

  function revealHero() {
    root.classList.add('is-loaded');
    heroName.forEach((el) => el.classList.add('is-in'));
    setTimeout(() => { if (loader) loader.remove(); }, 1400);
  }

  if (!loader || reduceMotion) {
    revealHero();
  } else {
    const countEl = document.getElementById('loaderCount');
    const barEl = document.getElementById('loaderBar');
    const start = performance.now();
    const minDur = 1300;
    let ready = false;
    const fontsReady = document.fonts ? document.fonts.ready : Promise.resolve();
    Promise.race([fontsReady, new Promise((r) => setTimeout(r, 2500))]).then(() => { ready = true; });

    const step = (t) => {
      const elapsed = t - start;
      let p = clamp(elapsed / minDur, 0, 1);
      if (!ready) p = Math.min(p, 0.9);
      const eased = 1 - Math.pow(1 - p, 3);
      const n = Math.round(eased * 100);
      countEl.textContent = String(n).padStart(3, '0');
      barEl.style.transform = `scaleX(${eased})`;
      if (p < 1) requestAnimationFrame(step);
      else setTimeout(revealHero, 180);
    };
    requestAnimationFrame(step);
  }

  /* ---------- Rotating role ---------- */
  const roleEl = document.getElementById('typingText');
  let roles = typingTitles.en;
  let roleIdx = 0;

  function showRole(i) {
    roleEl.classList.remove('is-in');
    void roleEl.offsetWidth; // replay the enter animation
    roleEl.textContent = roles[i];
    roleEl.classList.add('is-in');
  }

  if (roleEl && !reduceMotion) {
    setInterval(() => {
      roleIdx = (roleIdx + 1) % roles.length;
      showRole(roleIdx);
    }, 2600);
  }

  window.__updateTypingTitles = (lang) => {
    roles = typingTitles[lang] || typingTitles.en;
    roleIdx = 0;
    if (roleEl) showRole(0);
  };

  // i18n hook: newly injected headings need splitting again
  window.__afterTranslate = () => {
    splitAll();
    document.querySelectorAll('[data-split]').forEach((el) => {
      if (reduceMotion || el.getBoundingClientRect().top < window.innerHeight) el.classList.add('is-in');
    });
  };

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
        const dur = 1200;
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

  /* ---------- Scroll-driven effects ---------- */
  const topbar = document.getElementById('topbar');
  const progress = document.getElementById('progress');
  const marq = document.getElementById('bigmarq');
  const coverName = document.querySelector('.cover__name');
  const slides = [...document.querySelectorAll('.slide')];
  const stackQuery = window.matchMedia('(min-width: 1081px) and (min-height: 700px)');
  let ticking = false;

  function onScroll() {
    const y = window.scrollY;
    const vh = window.innerHeight;
    const max = document.documentElement.scrollHeight - vh;

    topbar.classList.toggle('is-scrolled', y > 12);
    progress.style.transform = `scaleX(${max > 0 ? y / max : 0})`;

    if (!reduceMotion) {
      if (coverName && y < vh * 1.2) coverName.style.transform = `translate3d(0, ${y * 0.18}px, 0)`;

      if (marq) {
        const r = marq.parentElement.getBoundingClientRect();
        if (r.bottom > 0 && r.top < vh) {
          const p = (vh - r.top) / (vh + r.height);
          marq.style.transform = `translate3d(${-p * 35}%, 0, 0)`;
        }
      }

      // Stacked project slides: earlier cards shrink and dim as the next one covers them
      if (stackQuery.matches) {
        slides.forEach((slide, i) => {
          const next = slides[i + 1];
          if (!next) return;
          const top = parseFloat(getComputedStyle(slide).top) || 0;
          const nr = next.getBoundingClientRect();
          const p = clamp((vh - nr.top) / (vh - top), 0, 1);
          slide.style.setProperty('--p', p.toFixed(3));
        });
      } else {
        slides.forEach((s) => s.style.removeProperty('--p'));
      }
    }
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();

  /* ---------- Pointer effects (desktop only) ---------- */
  if (finePointer && !reduceMotion) {
    // Follower cursor with contextual label
    const cursor = document.getElementById('cursor');
    const label = document.getElementById('cursorLabel');
    const words = {
      en: { view: 'View', drag: 'Drag' },
      tr: { view: 'İncele', drag: 'Sürükle' },
    };
    let mx = -100, my = -100, cx = -100, cy = -100;

    window.addEventListener('pointermove', (e) => {
      mx = e.clientX; my = e.clientY;
      root.classList.add('has-cursor');
    }, { passive: true });
    document.addEventListener('pointerleave', () => root.classList.remove('has-cursor'));

    const loop = () => {
      cx += (mx - cx) * 0.2;
      cy += (my - cy) * 0.2;
      cursor.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      requestAnimationFrame(loop);
    };
    loop();

    document.addEventListener('pointerover', (e) => {
      const ctx = e.target.closest('[data-cursor]');
      const link = e.target.closest('a, button, summary');
      const lang = (window.__getCurrentLang && window.__getCurrentLang()) || 'en';
      cursor.classList.toggle('is-label', !!ctx && !link);
      cursor.classList.toggle('is-link', !!link);
      label.textContent = ctx && !link ? words[lang][ctx.dataset.cursor] : '';
    });

    // Magnetic buttons
    document.querySelectorAll('.btn, .round, .topbar__menu, .slide__link').forEach((el) => {
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        el.style.transform = `translate(${dx * 0.22}px, ${dy * 0.32}px)`;
      });
      el.addEventListener('pointerleave', () => { el.style.transform = ''; });
    });

    // Hero: blobs and thumbnails drift with the pointer
    const cover = document.querySelector('.hero .cover');
    const blobs = cover.querySelector('.blobs');
    const thumbs = cover.querySelector('.cover__thumbs');
    cover.addEventListener('pointermove', (e) => {
      const r = cover.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      blobs.style.transform = `translate(${px * 40}px, ${py * 30}px)`;
      thumbs.style.transform = `translate(${px * -14}px, ${py * -10}px)`;
    });
    cover.addEventListener('pointerleave', () => {
      blobs.style.transform = '';
      thumbs.style.transform = '';
    });
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
