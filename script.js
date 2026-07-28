// Custom Cursor
const cursorDot = document.getElementById('cursorDot');
const cursorRing = document.getElementById('cursorRing');

if (cursorDot && cursorRing) {
  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = `${mouseX}px`;
    cursorDot.style.top = `${mouseY}px`;
  });

  const loop = () => {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    cursorRing.style.left = `${ringX}px`;
    cursorRing.style.top = `${ringY}px`;
    requestAnimationFrame(loop);
  };
  loop();

  // Hover states
  document.querySelectorAll('a, button, .bento-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorDot.classList.add('hv');
      cursorRing.classList.add('hv');
    });
    el.addEventListener('mouseleave', () => {
      cursorDot.classList.remove('hv');
      cursorRing.classList.remove('hv');
    });
  });
}

// Dynamic Ambient Scroll Mesh Glow Effect
const bgMesh = document.querySelector('.bg-mesh');
window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const scrollRatio = Math.min(1, Math.max(0, scrollTop / (maxScroll || 1)));

  if (bgMesh) {
    const glowY = 20 + scrollRatio * 60; // 20% to 80%
    const glowX = 70 - scrollRatio * 40; // 70% to 30%
    const glow2Y = 80 - scrollRatio * 50; // 80% to 30%

    bgMesh.style.setProperty('--glow-y', `${glowY}%`);
    bgMesh.style.setProperty('--glow-x', `${glowX}%`);
    bgMesh.style.setProperty('--glow2-y', `${glow2Y}%`);
  }
});

// Magnetic Buttons
document.querySelectorAll('.btn, .nav-cta').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px) scale(1.04)`;
  });

  btn.addEventListener('mouseleave', () => {
    btn.style.transform = `translate(0px, 0px) scale(1)`;
  });
});

// Card Glow Effect (Mouse Tracking)
document.querySelectorAll('.bento-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  });
});

// Navbar Scroll Logic
let lastScroll = 0;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  if (currentScroll <= 0) {
    navbar.classList.remove('hide');
    return;
  }
  if (currentScroll > lastScroll && currentScroll > 80) {
    navbar.classList.add('hide'); // scroll down
  } else {
    navbar.classList.remove('hide'); // scroll up
  }
  lastScroll = currentScroll;
});

// Mobile Menu
const hamBtn = document.getElementById('hamBtn');
const navMob = document.getElementById('navMob');
if (hamBtn && navMob) {
  hamBtn.addEventListener('click', () => {
    const isOp = navMob.classList.contains('open');
    if (isOp) {
      navMob.classList.remove('open');
      hamBtn.setAttribute('aria-expanded', 'false');
    } else {
      navMob.classList.add('open');
      hamBtn.setAttribute('aria-expanded', 'true');
    }
  });
}

// Reveal Observer
const rvObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('vis');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.rv').forEach(el => rvObserver.observe(el));

// Number Counters
const numObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.getAttribute('data-target'));
      const suffix = el.getAttribute('data-suffix') || '';
      let count = 0;
      const duration = 1800; // ms
      const inc = target / (duration / 16);
      
      const update = () => {
        count += inc;
        if (count < target) {
          el.innerText = Math.floor(count) + suffix;
          requestAnimationFrame(update);
        } else {
          el.innerText = target + suffix;
        }
      };
      update();
      observer.unobserve(el);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-num[data-target]').forEach(el => numObserver.observe(el));
