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

// Magnetic Buttons
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    // Move the button slightly towards the cursor
    btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px) scale(1.05)`;
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
    
    // Set CSS variables for the radial gradient center
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  });
});

// Navbar scroll hiding
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

// Intersection Observer for Reveal animations
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
      const duration = 2000; // ms
      const inc = target / (duration / 16); // 60fps
      
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

document.querySelectorAll('.stat-num[data-target], .bold-num[data-target]').forEach(el => numObserver.observe(el));

// FAQ Accordion
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', !expanded);
    const ans = btn.nextElementSibling;
    if (!expanded) {
      ans.style.maxHeight = ans.scrollHeight + "px";
    } else {
      ans.style.maxHeight = null;
    }
  });
});
