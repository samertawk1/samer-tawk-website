(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const sections = [...document.querySelectorAll('main > section')];
  if (!sections.length || !('IntersectionObserver' in window)) return;
  const active = new Set();
  let frame = 0;
  const clamp = value => Math.max(0, Math.min(1, value));
  function render() {
    frame = 0;
    if (reduced.matches || document.hidden) return;
    const strength = innerWidth <= 700 ? .35 : 1;
    active.forEach(section => {
      const rect = section.getBoundingClientRect();
      const progress = clamp((innerHeight - rect.top) / (innerHeight + rect.height));
      const drift = (progress - .5) * strength;
      section.style.setProperty('--terrain-drift', `${(drift * 48).toFixed(2)}px`);
      section.style.setProperty('--photo-drift', `${(drift * -28).toFixed(2)}px`);
      section.style.setProperty('--cloud-drift', `${(drift * 70).toFixed(2)}px`);
      section.style.setProperty('--hero-drift', `${(clamp(-rect.top / rect.height) * 35 * strength).toFixed(2)}px`);
    });
  }
  function schedule() {
    if (!frame && !reduced.matches) frame = requestAnimationFrame(render);
  }
  const visibility = new IntersectionObserver(entries => {
    entries.forEach(entry => entry.isIntersecting ? active.add(entry.target) : active.delete(entry.target));
    schedule();
  }, {rootMargin: '100px 0px'});
  sections.forEach(section => visibility.observe(section));
  const reveal = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.draw-on-scroll').forEach(path => path.classList.add('drawn'));
        reveal.unobserve(entry.target);
      }
    });
  }, {threshold: .65});
  document.querySelectorAll('main h1 svg path,main h2 svg path').forEach(path => {
    path.setAttribute('pathLength', '1');
    path.classList.add('draw-on-scroll');
    reveal.observe(path.closest('h1,h2'));
  });
  function syncPreference() {
    document.body.classList.toggle('home-dynamics', !reduced.matches);
    schedule();
  }
  addEventListener('scroll', schedule, {passive: true});
  addEventListener('resize', schedule);
  document.addEventListener('visibilitychange', schedule);
  reduced.addEventListener('change', syncPreference);
  syncPreference();
})();
