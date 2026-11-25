// Theme toggle. The first paint is handled by the inline script in <head>.
(function () {
  var btn = document.querySelector('.theme');
  if (btn) btn.addEventListener('click', function () {
    var next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch (e) {}
    btn.setAttribute('aria-label', next === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    window.dispatchEvent(new Event('themechange'));
  });
})();

// Motion. Everything starts visible in CSS, so the page is complete if this never runs.
window.addEventListener('DOMContentLoaded', function () {
  if (!window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);
  var mm = gsap.matchMedia();

  mm.add('(prefers-reduced-motion: no-preference)', function () {
    // First screen: one short sequence.
    var intro = gsap.utils.toArray('[data-in]');
    if (intro.length) {
      gsap.from(intro, { opacity: 0, y: 26, duration: 0.9, ease: 'expo.out', stagger: 0.09, clearProps: 'transform' });
    }
    // Sections fade up once as they enter.
    gsap.utils.toArray('[data-reveal]').forEach(function (el) {
      gsap.from(el, { opacity: 0, y: 36, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 86%', once: true } });
    });
    // Lists: rows arrive one after another.
    gsap.utils.toArray('[data-rows]').forEach(function (list) {
      gsap.from(list.children, { opacity: 0, y: 16, duration: 0.6, ease: 'power3.out', stagger: 0.045,
        scrollTrigger: { trigger: list, start: 'top 88%', once: true } });
    });
    // Numbers count up once.
    gsap.utils.toArray('[data-count]').forEach(function (el) {
      var end = parseFloat(el.dataset.count), dec = (el.dataset.count.split('.')[1] || '').length;
      var pre = el.dataset.pre || '', suf = el.dataset.suf || '', o = { v: 0 };
      var fmt = function (v) { return pre + Number(v.toFixed(dec)).toLocaleString('en-US', { minimumFractionDigits: dec }) + suf; };
      gsap.to(o, { v: end, duration: 1.3, ease: 'power2.out', onUpdate: function () { el.textContent = fmt(o.v); },
        scrollTrigger: { trigger: el, start: 'top 90%', once: true } });
    });
  });

  // Larger screens only: the case study cover settles as you scroll past it.
  mm.add('(prefers-reduced-motion: no-preference) and (min-width: 768px)', function () {
    var cover = document.querySelector('.cover img');
    if (cover) gsap.fromTo(cover, { scale: 1.06 }, { scale: 1, ease: 'none',
      scrollTrigger: { trigger: cover, start: 'top 85%', end: 'bottom 40%', scrub: 0.6 } });
  });

  var refresh = function () { ScrollTrigger.refresh(); };
  window.addEventListener('load', refresh);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(refresh);
});
