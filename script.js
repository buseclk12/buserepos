/* ============================================================
   BUSE CELIK — PORTFOLIO · Interactive Scripts
   ============================================================ */

(function () {
  'use strict';

  /* ---------- 3D PARTICLE GRID (Hero Canvas) ---------- */
  const canvas = document.getElementById('heroCanvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  let mouse = { x: -9999, y: -9999 };
  let animFrame;

  const GRID_COLS = 36;
  const GRID_ROWS = 22;
  const CONNECTION_DIST = 100;
  const MOUSE_RADIUS = 200;

  function resizeCanvas() {
    canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    initParticles();
  }

  function initParticles() {
    particles = [];
    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    const cellW = w / GRID_COLS;
    const cellH = h / GRID_ROWS;

    for (let i = 0; i < GRID_COLS; i++) {
      for (let j = 0; j < GRID_ROWS; j++) {
        particles.push({
          baseX: cellW * i + cellW / 2,
          baseY: cellH * j + cellH / 2,
          x: cellW * i + cellW / 2,
          y: cellH * j + cellH / 2,
          vx: 0,
          vy: 0,
          size: 1.5 + Math.random() * 1.2,
        });
      }
    }
  }

  function animateParticles() {
    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    ctx.clearRect(0, 0, w, h);

    // Update & draw particles
    for (const p of particles) {
      const dx = mouse.x - p.x;
      const dy = mouse.y - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < MOUSE_RADIUS) {
        const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
        const angle = Math.atan2(dy, dx);
        p.vx -= Math.cos(angle) * force * 2.5;
        p.vy -= Math.sin(angle) * force * 2.5;
      }

      // Spring back
      p.vx += (p.baseX - p.x) * 0.03;
      p.vy += (p.baseY - p.y) * 0.03;

      // Damping
      p.vx *= 0.88;
      p.vy *= 0.88;

      p.x += p.vx;
      p.y += p.vy;

      const distFromMouse = Math.sqrt(
        (mouse.x - p.x) ** 2 + (mouse.y - p.y) ** 2
      );
      const brightness = distFromMouse < MOUSE_RADIUS
        ? 0.45 + 0.55 * (1 - distFromMouse / MOUSE_RADIUS)
        : 0.35;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(232, 139, 147, ${brightness})`;
      ctx.fill();
    }

    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < CONNECTION_DIST) {
          const alpha = (1 - dist / CONNECTION_DIST) * 0.28;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(232, 139, 147, ${alpha})`;
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }
      }
    }

    animFrame = requestAnimationFrame(animateParticles);
  }

  // Track mouse on hero
  document.getElementById('hero').addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });
  document.getElementById('hero').addEventListener('mouseleave', () => {
    mouse.x = -9999;
    mouse.y = -9999;
  });

  window.addEventListener('resize', () => {
    cancelAnimationFrame(animFrame);
    resizeCanvas();
  });

  resizeCanvas();
  animateParticles();

  /* ---------- CURSOR GLOW ---------- */
  const cursorGlow = document.getElementById('cursorGlow');
  let cursorVisible = false;
  document.addEventListener('mousemove', (e) => {
    if (!cursorVisible) {
      cursorGlow.classList.add('active');
      cursorVisible = true;
    }
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
  });

  /* ---------- TYPING EFFECT (Hero) ---------- */
  const typingEl = document.getElementById('typingText');
  let titles = [
    'Full-Stack Software Engineer',
    'Backend Architect',
    'Mobile Developer',
    'UI/UX Designer',
    'AI Integration Specialist',
    'DevOps Engineer',
    'System Designer',
  ];
  let titleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typingTimeout;

  function typeTitle() {
    const current = titles[titleIdx];

    if (!isDeleting) {
      charIdx++;
      typingEl.textContent = current.substring(0, charIdx);
      if (charIdx === current.length) {
        isDeleting = true;
        typingTimeout = setTimeout(typeTitle, 2200);
        return;
      }
      typingTimeout = setTimeout(typeTitle, 60 + Math.random() * 40);
    } else {
      charIdx--;
      typingEl.textContent = current.substring(0, charIdx);
      if (charIdx === 0) {
        isDeleting = false;
        titleIdx = (titleIdx + 1) % titles.length;
        typingTimeout = setTimeout(typeTitle, 400);
        return;
      }
      typingTimeout = setTimeout(typeTitle, 30 + Math.random() * 20);
    }
  }
  typeTitle();

  // i18n: expose function to update typing titles when language changes
  window.__updateTypingTitles = function(lang) {
    if (typeof typingTitles !== 'undefined' && typingTitles[lang]) {
      titles = typingTitles[lang];
      clearTimeout(typingTimeout);
      titleIdx = 0;
      charIdx = 0;
      isDeleting = false;
      typingEl.textContent = '';
      typeTitle();
    }
  };

  /* ---------- TERMINAL TYPING (Skills) ---------- */
  const terminalCmd = document.getElementById('terminalCmd');
  const cmds = [
    'echo "Ready to build."',
    'git push origin main',
    'docker compose up -d',
    'npm run deploy',
    'kubectl apply -f prod.yaml',
  ];
  let cmdIdx = 0;
  let cmdCharIdx = 0;
  let cmdDeleting = false;

  function typeTerminal() {
    const current = cmds[cmdIdx];

    if (!cmdDeleting) {
      cmdCharIdx++;
      terminalCmd.textContent = current.substring(0, cmdCharIdx);
      if (cmdCharIdx === current.length) {
        cmdDeleting = true;
        setTimeout(typeTerminal, 2500);
        return;
      }
      setTimeout(typeTerminal, 55 + Math.random() * 45);
    } else {
      cmdCharIdx--;
      terminalCmd.textContent = current.substring(0, cmdCharIdx);
      if (cmdCharIdx === 0) {
        cmdDeleting = false;
        cmdIdx = (cmdIdx + 1) % cmds.length;
        setTimeout(typeTerminal, 300);
        return;
      }
      setTimeout(typeTerminal, 20 + Math.random() * 15);
    }
  }
  typeTerminal();

  /* ---------- SCROLL ANIMATIONS (Intersection Observer) ---------- */
  const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -40px 0px' };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.anim-fade-up').forEach((el) => observer.observe(el));

  /* ---------- SKILL BAR ANIMATION ---------- */
  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.skill-item__fill').forEach((bar) => {
            bar.classList.add('animated');
          });
          skillObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );
  document.querySelectorAll('.skills__grid').forEach((el) => skillObserver.observe(el));

  /* ---------- COUNTER ANIMATION ---------- */
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.stat__number[data-count]').forEach((el) => {
            const target = parseInt(el.dataset.count, 10);
            let current = 0;
            const increment = Math.max(1, Math.ceil(target / 40));
            const step = () => {
              current += increment;
              if (current >= target) {
                el.textContent = target;
              } else {
                el.textContent = current;
                requestAnimationFrame(step);
              }
            };
            requestAnimationFrame(step);
          });
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );
  document.querySelectorAll('.about__stats').forEach((el) => counterObserver.observe(el));

  /* ---------- NAV SCROLL EFFECT ---------- */
  const nav = document.getElementById('nav');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    nav.classList.toggle('scrolled', scrollY > 60);
    lastScroll = scrollY;
  }, { passive: true });

  /* ---------- MOBILE MENU ---------- */
  const burger = document.getElementById('navBurger');
  const mobileMenu = document.getElementById('mobileMenu');

  burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    mobileMenu.classList.toggle('open');
  });

  // Close on link click
  mobileMenu.querySelectorAll('.mobile-menu__link').forEach((link) => {
    link.addEventListener('click', () => {
      burger.classList.remove('active');
      mobileMenu.classList.remove('open');
    });
  });

  /* ---------- SMOOTH SCROLL ---------- */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ---------- POSTER CAROUSEL ---------- */
  const track = document.getElementById('carouselTrack');
  const slides = track.querySelectorAll('.carousel__slide');
  const prevBtn = document.getElementById('carouselPrev');
  const nextBtn = document.getElementById('carouselNext');
  const dotsContainer = document.getElementById('carouselDots');
  let currentIndex = 0;
  let slidesPerView = 4;
  let totalPages = 1;

  function getSlidesPerView() {
    const w = window.innerWidth;
    if (w <= 480) return 1;
    if (w <= 768) return 2;
    if (w <= 1024) return 3;
    return 4;
  }

  function buildDots() {
    dotsContainer.innerHTML = '';
    totalPages = Math.ceil(slides.length / slidesPerView);
    for (let i = 0; i < totalPages; i++) {
      const dot = document.createElement('button');
      dot.className = 'carousel__dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', 'Go to page ' + (i + 1));
      dot.addEventListener('click', () => goToPage(i));
      dotsContainer.appendChild(dot);
    }
  }

  function updateCarousel() {
    const gap = 20;
    const containerWidth = track.parentElement.clientWidth -
      (window.innerWidth <= 480 ? 80 : window.innerWidth <= 768 ? 88 : window.innerWidth <= 1024 ? 100 : 120);
    const slideWidth = (containerWidth - gap * (slidesPerView - 1)) / slidesPerView;
    const offset = currentIndex * (slideWidth + gap);
    track.style.transform = `translateX(-${offset}px)`;

    // Update dots
    const activePage = Math.floor(currentIndex / slidesPerView);
    dotsContainer.querySelectorAll('.carousel__dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === activePage);
    });

    // Update buttons
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex >= slides.length - slidesPerView;
  }

  function goToPage(page) {
    currentIndex = page * slidesPerView;
    if (currentIndex > slides.length - slidesPerView) {
      currentIndex = slides.length - slidesPerView;
    }
    updateCarousel();
  }

  prevBtn.addEventListener('click', () => {
    currentIndex = Math.max(0, currentIndex - slidesPerView);
    updateCarousel();
  });

  nextBtn.addEventListener('click', () => {
    currentIndex = Math.min(slides.length - slidesPerView, currentIndex + slidesPerView);
    updateCarousel();
  });

  // Drag / swipe support
  let isDragging = false;
  let startX = 0;
  let dragOffset = 0;

  track.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.pageX;
    track.classList.add('grabbing');
  });

  track.addEventListener('touchstart', (e) => {
    isDragging = true;
    startX = e.touches[0].pageX;
  }, { passive: true });

  function onDragMove(pageX) {
    if (!isDragging) return;
    dragOffset = pageX - startX;
  }

  document.addEventListener('mousemove', (e) => onDragMove(e.pageX));
  document.addEventListener('touchmove', (e) => onDragMove(e.touches[0].pageX), { passive: true });

  function onDragEnd() {
    if (!isDragging) return;
    isDragging = false;
    track.classList.remove('grabbing');

    if (Math.abs(dragOffset) > 60) {
      if (dragOffset < 0 && currentIndex < slides.length - slidesPerView) {
        currentIndex = Math.min(slides.length - slidesPerView, currentIndex + 1);
      } else if (dragOffset > 0 && currentIndex > 0) {
        currentIndex = Math.max(0, currentIndex - 1);
      }
    }
    dragOffset = 0;
    updateCarousel();
  }

  document.addEventListener('mouseup', onDragEnd);
  document.addEventListener('touchend', onDragEnd);

  // Prevent image dragging
  track.addEventListener('dragstart', (e) => e.preventDefault());

  // Init & resize
  function initCarousel() {
    slidesPerView = getSlidesPerView();
    currentIndex = Math.min(currentIndex, slides.length - slidesPerView);
    if (currentIndex < 0) currentIndex = 0;
    buildDots();
    updateCarousel();
  }

  initCarousel();
  window.addEventListener('resize', initCarousel);

  /* ---------- POSTER LIGHTBOX ---------- */
  const lightbox = document.getElementById('posterLightbox');
  const lightboxImg = document.getElementById('posterLightboxImg');
  const lightboxClose = document.getElementById('posterLightboxClose');

  slides.forEach((slide) => {
    slide.addEventListener('click', (e) => {
      if (Math.abs(dragOffset) > 10) return; // Don't open on drag
      const src = slide.getAttribute('data-poster');
      lightboxImg.src = src;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) closeLightbox();
  });

  /* ---------- TRIGGER HERO ANIMATIONS IMMEDIATELY ---------- */
  setTimeout(() => {
    document.querySelectorAll('.hero .anim-fade-up').forEach((el) => {
      el.classList.add('visible');
    });
  }, 100);

})();
