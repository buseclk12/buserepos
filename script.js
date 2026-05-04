/* ============================================================
   BUSE CELIK — PORTFOLIO · Interactive Scripts
   ============================================================ */

(function () {
  'use strict';

  /* ---------- SOFT AURORA (Hero WebGL Background) ----------
     Vanilla port of React Bits @react-bits/SoftAurora-JS-CSS
     Original shader by React Bits — uses perlin3D + cosineGradient bands. */
  const canvas = document.getElementById('heroCanvas');
  const auroraOpts = {
    speed: 0.6,
    scale: 1.5,
    brightness: 1.0,
    color1: [0xf7/255, 0xf7/255, 0xf7/255], // #f7f7f7
    color2: [0xe1/255, 0x00/255, 0xff/255], // #e100ff
    noiseFrequency: 2.5,
    noiseAmplitude: 1.0,
    bandHeight: 0.5,
    bandSpread: 1.0,
    octaveDecay: 0.1,
    layerOffset: 0.0,
    colorSpeed: 1.0,
    enableMouseInteraction: true,
    mouseInfluence: 0.25,
  };
  const gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: false, antialias: true });
  let auroraRaf;
  let targetMouse = [0.5, 0.5];
  let currentMouse = [0.5, 0.5];

  if (gl) {
    const vsSrc = `
      attribute vec2 position;
      attribute vec2 uv;
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const fsSrc = `
precision highp float;

uniform float uTime;
uniform vec3 uResolution;
uniform float uSpeed;
uniform float uScale;
uniform float uBrightness;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform float uNoiseFreq;
uniform float uNoiseAmp;
uniform float uBandHeight;
uniform float uBandSpread;
uniform float uOctaveDecay;
uniform float uLayerOffset;
uniform float uColorSpeed;
uniform vec2 uMouse;
uniform float uMouseInfluence;
uniform bool uEnableMouse;

#define TAU 6.28318

vec3 gradientHash(vec3 p) {
  p = vec3(
    dot(p, vec3(127.1, 311.7, 234.6)),
    dot(p, vec3(269.5, 183.3, 198.3)),
    dot(p, vec3(169.5, 283.3, 156.9))
  );
  vec3 h = fract(sin(p) * 43758.5453123);
  float phi = acos(2.0 * h.x - 1.0);
  float theta = TAU * h.y;
  return vec3(cos(theta) * sin(phi), sin(theta) * cos(phi), cos(phi));
}

float quinticSmooth(float t) {
  float t2 = t * t;
  float t3 = t * t2;
  return 6.0 * t3 * t2 - 15.0 * t2 * t2 + 10.0 * t3;
}

vec3 cosineGradient(float t, vec3 a, vec3 b, vec3 c, vec3 d) {
  return a + b * cos(TAU * (c * t + d));
}

float perlin3D(float amplitude, float frequency, float px, float py, float pz) {
  float x = px * frequency;
  float y = py * frequency;

  float fx = floor(x); float fy = floor(y); float fz = floor(pz);
  float cx = ceil(x);  float cy = ceil(y);  float cz = ceil(pz);

  vec3 g000 = gradientHash(vec3(fx, fy, fz));
  vec3 g100 = gradientHash(vec3(cx, fy, fz));
  vec3 g010 = gradientHash(vec3(fx, cy, fz));
  vec3 g110 = gradientHash(vec3(cx, cy, fz));
  vec3 g001 = gradientHash(vec3(fx, fy, cz));
  vec3 g101 = gradientHash(vec3(cx, fy, cz));
  vec3 g011 = gradientHash(vec3(fx, cy, cz));
  vec3 g111 = gradientHash(vec3(cx, cy, cz));

  float d000 = dot(g000, vec3(x - fx, y - fy, pz - fz));
  float d100 = dot(g100, vec3(x - cx, y - fy, pz - fz));
  float d010 = dot(g010, vec3(x - fx, y - cy, pz - fz));
  float d110 = dot(g110, vec3(x - cx, y - cy, pz - fz));
  float d001 = dot(g001, vec3(x - fx, y - fy, pz - cz));
  float d101 = dot(g101, vec3(x - cx, y - fy, pz - cz));
  float d011 = dot(g011, vec3(x - fx, y - cy, pz - cz));
  float d111 = dot(g111, vec3(x - cx, y - cy, pz - cz));

  float sx = quinticSmooth(x - fx);
  float sy = quinticSmooth(y - fy);
  float sz = quinticSmooth(pz - fz);

  float lx00 = mix(d000, d100, sx);
  float lx10 = mix(d010, d110, sx);
  float lx01 = mix(d001, d101, sx);
  float lx11 = mix(d011, d111, sx);

  float ly0 = mix(lx00, lx10, sy);
  float ly1 = mix(lx01, lx11, sy);

  return amplitude * mix(ly0, ly1, sz);
}

float auroraGlow(float t, vec2 shift) {
  vec2 uv = gl_FragCoord.xy / uResolution.y;
  uv += shift;

  float noiseVal = 0.0;
  float freq = uNoiseFreq;
  float amp = uNoiseAmp;
  vec2 samplePos = uv * uScale;

  for (float i = 0.0; i < 3.0; i += 1.0) {
    noiseVal += perlin3D(amp, freq, samplePos.x, samplePos.y, t);
    amp *= uOctaveDecay;
    freq *= 2.0;
  }

  float yBand = uv.y * 10.0 - uBandHeight * 10.0;
  return 0.3 * max(exp(uBandSpread * (1.0 - 1.1 * abs(noiseVal + yBand))), 0.0);
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution.xy;
  float t = uSpeed * 0.4 * uTime;

  vec2 shift = vec2(0.0);
  if (uEnableMouse) {
    shift = (uMouse - 0.5) * uMouseInfluence;
  }

  vec3 col = vec3(0.0);
  col += 0.99 * auroraGlow(t, shift) * cosineGradient(uv.x + uTime * uSpeed * 0.2 * uColorSpeed, vec3(0.5), vec3(0.5), vec3(1.0), vec3(0.3, 0.20, 0.20)) * uColor1;
  col += 0.99 * auroraGlow(t + uLayerOffset, shift) * cosineGradient(uv.x + uTime * uSpeed * 0.1 * uColorSpeed, vec3(0.5), vec3(0.5), vec3(2.0, 1.0, 0.0), vec3(0.5, 0.20, 0.25)) * uColor2;

  col *= uBrightness;
  float alpha = clamp(length(col), 0.0, 1.0);
  gl_FragColor = vec4(col, alpha);
}
    `;

    function compile(type, src) {
      const sh = gl.createShader(type);
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        console.error('SoftAurora shader compile error:', gl.getShaderInfoLog(sh));
        gl.deleteShader(sh);
        return null;
      }
      return sh;
    }

    const vs = compile(gl.VERTEX_SHADER, vsSrc);
    const fs = compile(gl.FRAGMENT_SHADER, fsSrc);
    const prog = gl.createProgram();
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error('SoftAurora program link error:', gl.getProgramInfoLog(prog));
    }
    gl.useProgram(prog);

    // Triangle covering screen (matches ogl Triangle: vertices [-1,-1, 3,-1, -1,3])
    const posBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(prog, 'position');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uvBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, uvBuf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0, 0, 2, 0, 0, 2]), gl.STATIC_DRAW);
    const aUv = gl.getAttribLocation(prog, 'uv');
    if (aUv >= 0) {
      gl.enableVertexAttribArray(aUv);
      gl.vertexAttribPointer(aUv, 2, gl.FLOAT, false, 0, 0);
    }

    const u = {
      uTime: gl.getUniformLocation(prog, 'uTime'),
      uResolution: gl.getUniformLocation(prog, 'uResolution'),
      uSpeed: gl.getUniformLocation(prog, 'uSpeed'),
      uScale: gl.getUniformLocation(prog, 'uScale'),
      uBrightness: gl.getUniformLocation(prog, 'uBrightness'),
      uColor1: gl.getUniformLocation(prog, 'uColor1'),
      uColor2: gl.getUniformLocation(prog, 'uColor2'),
      uNoiseFreq: gl.getUniformLocation(prog, 'uNoiseFreq'),
      uNoiseAmp: gl.getUniformLocation(prog, 'uNoiseAmp'),
      uBandHeight: gl.getUniformLocation(prog, 'uBandHeight'),
      uBandSpread: gl.getUniformLocation(prog, 'uBandSpread'),
      uOctaveDecay: gl.getUniformLocation(prog, 'uOctaveDecay'),
      uLayerOffset: gl.getUniformLocation(prog, 'uLayerOffset'),
      uColorSpeed: gl.getUniformLocation(prog, 'uColorSpeed'),
      uMouse: gl.getUniformLocation(prog, 'uMouse'),
      uMouseInfluence: gl.getUniformLocation(prog, 'uMouseInfluence'),
      uEnableMouse: gl.getUniformLocation(prog, 'uEnableMouse'),
    };

    gl.uniform3fv(u.uColor1, auroraOpts.color1);
    gl.uniform3fv(u.uColor2, auroraOpts.color2);
    gl.uniform1f(u.uSpeed, auroraOpts.speed);
    gl.uniform1f(u.uScale, auroraOpts.scale);
    gl.uniform1f(u.uBrightness, auroraOpts.brightness);
    gl.uniform1f(u.uNoiseFreq, auroraOpts.noiseFrequency);
    gl.uniform1f(u.uNoiseAmp, auroraOpts.noiseAmplitude);
    gl.uniform1f(u.uBandHeight, auroraOpts.bandHeight);
    gl.uniform1f(u.uBandSpread, auroraOpts.bandSpread);
    gl.uniform1f(u.uOctaveDecay, auroraOpts.octaveDecay);
    gl.uniform1f(u.uLayerOffset, auroraOpts.layerOffset);
    gl.uniform1f(u.uColorSpeed, auroraOpts.colorSpeed);
    gl.uniform1f(u.uMouseInfluence, auroraOpts.mouseInfluence);
    gl.uniform1i(u.uEnableMouse, auroraOpts.enableMouseInteraction ? 1 : 0);

    gl.clearColor(0, 0, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.max(1, Math.floor(canvas.offsetWidth * dpr));
      const h = Math.max(1, Math.floor(canvas.offsetHeight * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
      gl.uniform3f(u.uResolution, canvas.width, canvas.height, canvas.width / canvas.height);
    }

    if (auroraOpts.enableMouseInteraction) {
      canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        targetMouse = [
          (e.clientX - rect.left) / rect.width,
          1.0 - (e.clientY - rect.top) / rect.height,
        ];
      });
      canvas.addEventListener('mouseleave', () => {
        targetMouse = [0.5, 0.5];
      });
    }
    window.addEventListener('resize', resize);
    resize();

    function render(time) {
      auroraRaf = requestAnimationFrame(render);
      resize();
      gl.uniform1f(u.uTime, time * 0.001);

      if (auroraOpts.enableMouseInteraction) {
        currentMouse[0] += 0.05 * (targetMouse[0] - currentMouse[0]);
        currentMouse[1] += 0.05 * (targetMouse[1] - currentMouse[1]);
        gl.uniform2f(u.uMouse, currentMouse[0], currentMouse[1]);
      } else {
        gl.uniform2f(u.uMouse, 0.5, 0.5);
      }

      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    }
    auroraRaf = requestAnimationFrame(render);
  } else {
    canvas.style.background = 'radial-gradient(ellipse at 50% 50%, rgba(225, 0, 255, 0.20), transparent 60%)';
  }

  /* ---------- HERO PARALLAX ---------- */
  const heroTitleEl = document.querySelector('.hero__title');
  if (heroTitleEl) {
    window.addEventListener('scroll', () => {
      const offset = Math.min(window.scrollY * 0.3, 200);
      heroTitleEl.style.transform = `translateY(${-offset}px)`;
    }, { passive: true });
  }

  /* ---------- 3D TILT ON PROJECT CARDS ---------- */
  document.querySelectorAll('.project-card').forEach((el) => {
    el.style.transformStyle = 'preserve-3d';
    el.addEventListener('mousemove', (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      const max = 6;
      el.style.transform = `perspective(1000px) rotateX(${-py * max}deg) rotateY(${px * max}deg) translateY(-4px) translateZ(8px)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) translateZ(0)';
    });
  });

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
