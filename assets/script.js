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

// Scroll reveal
const revealTargets = document.querySelectorAll(
  '.section__head, .brief__grid, .role, .skillcloud, .toolgrid, .edu-item, .extras, .contact__doc'
);
revealTargets.forEach(el => el.classList.add('reveal'));

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
