// Simple reveal-on-scroll utility using IntersectionObserver
// Adds .is-visible to elements with .reveal once when they enter the viewport.
// Respects prefers-reduced-motion by revealing immediately.
(function initRevealOnScroll(){
  if (typeof window === 'undefined' || typeof document === 'undefined') return;
  const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const nodes = Array.from(document.querySelectorAll('.reveal'));
  if (nodes.length === 0) return;

  if (prefersReduced || !('IntersectionObserver' in window)) {
    nodes.forEach(n => n.classList.add('is-visible'));
    return;
  }

  const obs = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { root: null, rootMargin: '0px 0px -10% 0px', threshold: 0.15 });

  nodes.forEach((n) => obs.observe(n));
})();
