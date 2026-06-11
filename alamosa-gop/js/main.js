// ============================================================
// Alamosa County GOP — Shared JavaScript
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Mobile nav toggle ---------- */
  const toggle = document.querySelector('.navbar-toggle');
  const menu   = document.querySelector('.navbar-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      menu.classList.toggle('open');
    });
    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => menu.classList.remove('open'));
    });
  }

  /* ---------- Active nav link ---------- */
  const currentPath = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar-menu a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ---------- Fade-in on scroll (lightweight) ---------- */
  const reveals = document.querySelectorAll('.card, .leader-card, .event-card, .doc-card');
  let hasRevealed = false;

  function checkReveal() {
    if (hasRevealed) return;
    const threshold = window.innerHeight * 0.9;
    let anyVisible = false;
    reveals.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < threshold) {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
        anyVisible = true;
      }
    });
    if (anyVisible) hasRevealed = true;
  }

  // Check once on load for elements already in view
  checkReveal();
  // Then check on scroll
  window.addEventListener('scroll', checkReveal, { passive: true });

  // Ensure all elements are visible as a fallback
  setTimeout(() => {
    reveals.forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    });
  }, 500);
});
