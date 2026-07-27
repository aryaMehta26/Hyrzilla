'use strict';

// ── Hero Canvas Particle Network ────────────────────────────
(function initHeroCanvas() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles, animId;
  const mouse = { x: -9999, y: -9999 };

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  class Particle {
    constructor() { this.reset(true); }
    reset(init) {
      this.x  = Math.random() * W;
      this.y  = init ? Math.random() * H : (Math.random() < 0.5 ? -5 : H + 5);
      this.vx = (Math.random() - 0.5) * 0.35;
      this.vy = (Math.random() - 0.5) * 0.35;
      this.r  = Math.random() * 1.6 + 0.5;
      this.base    = Math.random() * 0.4 + 0.07;
      this.opacity = this.base;
      this.phase   = Math.random() * Math.PI * 2;
    }
    update(t) {
      const dx = this.x - mouse.x, dy = this.y - mouse.y;
      const d  = Math.sqrt(dx * dx + dy * dy);
      if (d < 120 && d > 0) {
        const f = (120 - d) / 120 * 0.38;
        this.vx += (dx / d) * f;
        this.vy += (dy / d) * f;
      }
      this.vx *= 0.982; this.vy *= 0.982;
      this.x  += this.vx; this.y += this.vy;
      this.opacity = this.base + Math.sin(t * 0.0009 + this.phase) * 0.09;
      if (this.x < -12) this.x = W + 12;
      if (this.x > W+12) this.x = -12;
      if (this.y < -12) this.y = H + 12;
      if (this.y > H+12) this.y = -12;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${this.opacity})`;
      ctx.fill();
    }
  }

  function init() {
    resize();
    const count = Math.min(90, Math.floor(W * H / 9000));
    particles = Array.from({ length: count }, () => new Particle());
  }

  const LINK = 150;
  let t = 0;

  function draw() {
    t++;
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(t); p.draw(); });
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const d2 = dx * dx + dy * dy;
        if (d2 < LINK * LINK) {
          const s = 1 - Math.sqrt(d2) / LINK;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(255,255,255,${s * 0.11})`;
          ctx.lineWidth   = s * 0.8;
          ctx.stroke();
        }
      }
    }
    animId = requestAnimationFrame(draw);
  }

  document.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });
  document.addEventListener('mouseleave', () => { mouse.x = -9999; mouse.y = -9999; });

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { if (!animId) draw(); }
      else { cancelAnimationFrame(animId); animId = null; }
    });
  });
  io.observe(canvas);
  window.addEventListener('resize', () => { resize(); });
  init(); draw();
})();

// ── Custom Cursor ───────────────────────────────────────────
(function initCursor() {
  const dot  = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  if (!dot || !ring) return;
  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px'; dot.style.top = my + 'px';
  });

  function lerpRing() {
    rx += (mx - rx) * 0.13; ry += (my - ry) * 0.13;
    ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
    requestAnimationFrame(lerpRing);
  }
  lerpRing();

  document.querySelectorAll('a,button,[role="button"]').forEach(el => {
    el.addEventListener('mouseenter', () => { dot.classList.add('hv'); ring.classList.add('hv'); });
    el.addEventListener('mouseleave', () => { dot.classList.remove('hv'); ring.classList.remove('hv'); });
  });

  document.addEventListener('mouseleave', () => {
    dot.style.opacity = '0'; ring.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    dot.style.opacity = '1'; ring.style.opacity = '1';
  });
})();

// ── Navbar Scroll ───────────────────────────────────────────
(function initNavbar() {
  const nav = document.getElementById('navbar');
  if (!nav) return;
  let last = 0;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y > 20) nav.classList.add('scrolled'); else nav.classList.remove('scrolled');
    last = y;
  }, { passive: true });
})();

// ── Mobile Nav ──────────────────────────────────────────────
(function initMobileNav() {
  const btn = document.getElementById('hamBtn');
  const mob = document.getElementById('navMob');
  if (!btn || !mob) return;
  btn.addEventListener('click', () => {
    const open = mob.classList.toggle('open');
    btn.setAttribute('aria-expanded', open.toString());
    document.body.style.overflow = open ? 'hidden' : '';
  });
  mob.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    mob.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }));
})();

// ── Scroll Reveal ───────────────────────────────────────────
(function initReveal() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.rv,.rv-l,.rv-r').forEach(el => io.observe(el));
})();

// ── Counter Animation ───────────────────────────────────────
(function initCounters() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = parseInt(el.dataset.target, 10);
      const suffix = el.dataset.suffix || '';
      if (isNaN(target)) return;
      const dur = 1600;
      const start = performance.now();
      function step(now) {
        const p = Math.min((now - start) / dur, 1);
        const ease = 1 - Math.pow(1 - p, 4);
        el.textContent = Math.round(ease * target) + suffix;
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
      io.unobserve(el);
    });
  }, { threshold: 0.4 });
  document.querySelectorAll('[data-target]').forEach(el => io.observe(el));
})();

// ── FAQ Accordion ───────────────────────────────────────────
(function initFAQ() {
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item   = btn.closest('.faq-item');
      const answer = item.querySelector('.faq-a');
      const open   = item.classList.toggle('open');
      btn.setAttribute('aria-expanded', open.toString());
      answer.style.maxHeight = open ? answer.scrollHeight + 'px' : '0';
    });
  });
})();

// ── Animated Charts (scroll-triggered) ─────────────────────
(function initCharts() {
  if (typeof Chart === 'undefined') return;

  Chart.defaults.color = '#8BA4B8';
  Chart.defaults.borderColor = 'rgba(255,255,255,0.07)';

  const COLORS = {
    green:  '#25E87A',
    blue:   '#38BDF8',
    gold:   '#C9A84C',
    green2: 'rgba(37,232,122,0.15)',
    blue2:  'rgba(56,189,248,0.15)',
    gold2:  'rgba(201,168,76,0.15)',
  };

  const chartDefs = {
    chartPlans: {
      type: 'doughnut',
      data: {
        labels: ['Base ($499)', 'Growth ($1,499)', 'Pro ($2,499)'],
        datasets: [{
          data: [38, 44, 18],
          backgroundColor: [COLORS.blue2, COLORS.green2, COLORS.gold2],
          borderColor:     [COLORS.blue,  COLORS.green,  COLORS.gold],
          borderWidth: 2, hoverOffset: 10,
        }]
      },
      options: {
        responsive: true, animation: { duration: 1200 },
        plugins: { legend: { position: 'bottom', labels: { padding: 18, font: { size: 11 } } } },
        cutout: '65%',
      }
    },
    chartEnroll: {
      type: 'bar',
      data: {
        labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
        datasets: [{
          label: 'Enrollments',
          data: [18,24,31,28,38,42,50,47,58,62,71,76],
          backgroundColor: COLORS.green2,
          borderColor: COLORS.green,
          borderWidth: 2, borderRadius: 6,
        }]
      },
      options: {
        responsive: true,
        animation: { delay: (ctx) => ctx.dataIndex * 60, duration: 900 },
        scales: { y: { beginAtZero: true }, x: {} },
        plugins: { legend: { display: false } },
      }
    },
    chartDomain: {
      type: 'bar',
      data: {
        labels: ['Cloud','DevOps','ML/AI','Data Eng','Backend','Full-Stack','Cybersec'],
        datasets: [{
          label: 'Placements',
          data: [92, 78, 65, 58, 54, 49, 34],
          backgroundColor: [
            COLORS.green2, COLORS.blue2, COLORS.gold2,
            COLORS.green2, COLORS.blue2, COLORS.gold2, COLORS.green2,
          ],
          borderColor: [
            COLORS.green, COLORS.blue, COLORS.gold,
            COLORS.green, COLORS.blue, COLORS.gold, COLORS.green,
          ],
          borderWidth: 2, borderRadius: 6,
        }]
      },
      options: {
        indexAxis: 'y', responsive: true,
        animation: { delay: (ctx) => ctx.dataIndex * 80, duration: 1000 },
        scales: { x: { beginAtZero: true }, y: {} },
        plugins: { legend: { display: false } },
      }
    },
    chartSat: {
      type: 'line',
      data: {
        labels: ['Q1','Q2','Q3','Q4'],
        datasets: [
          { label: 'Base', data: [4.1, 4.3, 4.2, 4.5], borderColor: COLORS.blue, backgroundColor: COLORS.blue2, tension: 0.4, pointRadius: 5, pointHoverRadius: 7 },
          { label: 'Growth', data: [4.4, 4.6, 4.7, 4.8], borderColor: COLORS.green, backgroundColor: COLORS.green2, tension: 0.4, pointRadius: 5, pointHoverRadius: 7 },
          { label: 'Pro', data: [4.7, 4.8, 4.9, 4.9], borderColor: COLORS.gold, backgroundColor: COLORS.gold2, tension: 0.4, pointRadius: 5, pointHoverRadius: 7 },
        ]
      },
      options: {
        responsive: true,
        animation: { duration: 1400 },
        scales: { y: { min: 3.5, max: 5 } },
        plugins: { legend: { position: 'top' } },
      }
    },
  };

  // Trigger each chart when it scrolls into view
  const chartIO = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const id = e.target.id;
      if (chartDefs[id] && !e.target._chartInited) {
        e.target._chartInited = true;
        new Chart(e.target, chartDefs[id]);
      }
      chartIO.unobserve(e.target);
    });
  }, { threshold: 0.25 });

  Object.keys(chartDefs).forEach(id => {
    const el = document.getElementById(id);
    if (el) chartIO.observe(el);
  });
})();

// ── Contact Form Validation ─────────────────────────────────
(function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  function err(id, msg) {
    const el = document.getElementById('err-' + id);
    if (el) el.textContent = msg;
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    let valid = true;

    const first = document.getElementById('first_name');
    const last  = document.getElementById('last_name');
    const email = document.getElementById('email');
    const svc   = document.getElementById('service');
    const msg   = document.getElementById('message');

    err('first',''); err('last',''); err('email',''); err('service',''); err('message','');

    if (first && !first.value.trim()) { err('first','First name is required.'); valid = false; }
    if (last  && !last.value.trim())  { err('last', 'Last name is required.');  valid = false; }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) { err('email','Enter a valid email.'); valid = false; }
    if (svc   && !svc.value)           { err('service','Please select a service.'); valid = false; }
    if (msg   && msg.value.trim().length < 10) { err('message','Please write a brief message.'); valid = false; }

    if (valid) {
      const btn = document.getElementById('contact-submit');
      if (btn) { btn.textContent = 'Message sent! We\'ll reply soon. ✓'; btn.style.background = 'var(--green-d)'; btn.disabled = true; }
      form.reset();
    }
  });
})();
