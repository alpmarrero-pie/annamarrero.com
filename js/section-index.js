// Sticky section index (EltaAI): highlights the section in view and smooth-scrolls on click.
(function () {
  var links = Array.prototype.slice.call(document.querySelectorAll('.el-idx a[data-sec]'));
  if (!links.length) return;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function section(id) { return document.querySelector('section[aria-labelledby="' + id + '"]'); }
  function mark(id) {
    links.forEach(function (a) {
      var on = a.getAttribute('data-sec') === id;
      a.classList.toggle('on', on);
      a.setAttribute('aria-current', on ? 'location' : 'false');
    });
  }
  var raf = 0;
  function onScroll() {
    if (raf) return;
    raf = requestAnimationFrame(function () {
      raf = 0;
      var cur = null, line = window.innerHeight * 0.35;
      links.forEach(function (a) {
        var el = section(a.getAttribute('data-sec'));
        if (el && el.getBoundingClientRect().top <= line) cur = a.getAttribute('data-sec');
      });
      mark(cur);
    });
  }
  links.forEach(function (a) {
    a.addEventListener('click', function (e) {
      var el = section(a.getAttribute('data-sec'));
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
      mark(a.getAttribute('data-sec'));
    });
  });
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
