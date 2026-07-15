const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
if (navToggle) {
  navToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Scroll reveal, with a light stagger for grouped items (cards, roles, tools)
const revealTargets = document.querySelectorAll(
  '.section__head, .brief__grid, .role, .skillcloud, .toolgrid, .edu-item, .extras, .contact__doc, .passion-card, .toolgrid__group'
);
revealTargets.forEach(el => el.classList.add('reveal'));

document.querySelectorAll('.passion-grid, .timeline, .toolgrid, .edu-list').forEach(group => {
  Array.from(group.children).forEach((child, i) => {
    child.style.setProperty('--reveal-delay', `${Math.min(i * 0.09, 0.36)}s`);
  });
});

if (prefersReducedMotion) {
  revealTargets.forEach(el => el.classList.add('is-visible'));
} else {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  revealTargets.forEach(el => io.observe(el));
}

// KPI count-up
const kpiNums = document.querySelectorAll('.hero__kpi-num');
const animateCount = (el) => {
  const target = parseInt(el.getAttribute('data-count'), 10) || 0;
  const duration = 900;
  const start = performance.now();
  const step = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target);
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
};

if (prefersReducedMotion) {
  kpiNums.forEach(el => { el.textContent = el.getAttribute('data-count'); });
} else {
  const kpiObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        kpiObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  kpiNums.forEach(el => kpiObserver.observe(el));
}

// ============ SCROLL PROGRESS BAR ============
const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
document.body.appendChild(progressBar);
const updateProgress = () => {
  const h = document.documentElement;
  const scrolled = h.scrollTop;
  const max = h.scrollHeight - h.clientHeight;
  progressBar.style.width = max > 0 ? `${(scrolled / max) * 100}%` : '0%';
};
updateProgress();
window.addEventListener('scroll', updateProgress, { passive: true });
window.addEventListener('resize', updateProgress);

if (!prefersReducedMotion) {

  // ============ PHOTO FRAME TILT — follows the cursor ============
  document.querySelectorAll('.photo-frame').forEach(frame => {
    const isPersonal = frame.classList.contains('photo-frame--personal');
    const baseRotate = isPersonal ? -3 : 0;
    frame.addEventListener('mousemove', (e) => {
      const rect = frame.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      const rotateY = px * 14;
      const rotateX = -py * 14;
      frame.style.transform = `perspective(800px) rotate(${baseRotate * 0.3}deg) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
    });
    frame.addEventListener('mouseleave', () => {
      frame.style.transform = '';
    });
  });

  // ============ PASSION CARD SPOTLIGHT + TILT ============
  document.querySelectorAll('.passion-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      card.style.setProperty('--mx', `${px * 100}%`);
      card.style.setProperty('--my', `${py * 100}%`);
      const rotateY = (px - 0.5) * 8;
      const rotateX = -(py - 0.5) * 8;
      card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // ============ MAGNETIC BUTTONS ============
  document.querySelectorAll('.btn, .nav__cta').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const px = e.clientX - rect.left - rect.width / 2;
      const py = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${px * 0.22}px, ${py * 0.35}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
}

// ============ BUTTON CLICK RIPPLE (works regardless of motion pref) ============
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', function (e) {
    const rect = btn.getBoundingClientRect();
    const ripple = document.createElement('span');
    const size = Math.max(rect.width, rect.height);
    ripple.className = 'btn__ripple';
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
    btn.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
  });
});
