// Work page: 3D slideshow of case studies with a type-of-work filter.
// To add, remove or reorder projects, edit the PROJECTS list below.
//   img:  slide image (in /images)
//   pos:  which part of a wide image stays in frame (CSS object-position)
//   bare: image carries its own cards on a transparent background (no frame, anchored to bottom)
//   device: a device mockup on a transparent background (centred, no frame)
(function () {
  var PROJECTS = [
    { id: 'analysis-agent', k: 'ai', title: 'Analysis Agent', tag: 'AI Agent Design', desc: 'An AI agent that cut analysis from 7.5 days to 2 hours.', bg: '#8C98A8', img: '/images/56384a55a404ea1c60d7434c5e72e76a.png', bare: true, page: '/analysis-agent' },
    { id: 'eltaai', k: 'product', title: 'EltaAI', tag: 'Product Design', desc: 'A safety app, from prototype to App Store.', bg: '#7F93EC', img: '/images/9d3463f1cbd287ffee49b093e89f06ba.png', page: '/eltaai' },
    { id: 'continuing-community', k: 'product', title: 'Continuing Community', tag: 'Product Design', desc: 'Alumni mentors, designed in a three-week sprint.', bg: '#6AB0E0', img: '/images/ba9744940fbc4d60f6aa593568758430.jpg', page: '/continuing-community' },
    { id: 'trusted-contact-program', k: 'service', title: 'Trusted Contact Program', tag: 'Service Design', desc: 'A new fraud safeguard, built into existing workflows.', bg: '#A38CDF', img: '/images/b8744df2ac4678f6ce765eb2f42be73b.jpg', pos: 'left top', page: '/trusted-contact' },
    { id: 'loss-of-a-loved-one', k: 'service', title: 'Loss of a Loved One', tag: 'Service Design', desc: 'A 42-day process, mapped and made clearer.', bg: '#8C98A8', img: '/images/cc26f7ed47879f9bb4e47ddc00f0fc4b.png', device: true, page: '/loss-of-a-loved-one' },
    { id: 'business-services', k: 'service', title: 'Business Services', tag: 'Service Design', desc: 'Storyboards that won CEO buy-in before launch.', bg: '#7F93EC', img: '/images/33c1ced7270040156d584e5158bb88d3.jpg', pos: 'left center', page: '/business-services' }
  ];
  var FILTERS = [['all', 'All work'], ['service', 'Service Design'], ['product', 'Product Design'], ['ai', 'AI Agent Design']];

  var main = document.getElementById('td-main');
  var stage = document.getElementById('td-stage');
  var slidesEl = document.getElementById('td-slides');
  var dashesEl = document.getElementById('td-dashes');
  var counterEl = document.getElementById('td-counter');
  var currentEl = document.getElementById('td-current');
  var pillsEl = document.getElementById('td-pills');
  var prevBtn = document.getElementById('td-prev');
  var nextBtn = document.getElementById('td-next');
  if (!slidesEl) return;

  var SLIDE_STYLE = "position: absolute; left: 50%; top: 0; width: var(--td-w); aspect-ratio: 16 / 10; border-radius: 18px; overflow: hidden; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; text-align: center; text-decoration: none; color: inherit; background-image: radial-gradient(circle, rgba(78,86,98,.26) 1.1px, transparent 1.5px), radial-gradient(90% 70% at 18% 0%, rgba(255,255,255,.55), rgba(255,255,255,0) 70%), radial-gradient(70% 60% at 100% 100%, rgba(15,34,51,.10), rgba(15,34,51,0) 70%), linear-gradient(165deg, rgba(255,255,255,.22) 0%, rgba(255,255,255,0) 45%, rgba(15,34,51,.07) 100%); background-size: 22px 22px, 100% 100%, 100% 100%, 100% 100%; background-position: 11px 11px, 0 0, 0 0, 0 0;";

  var filter = 'all', idx = 0, list = [], slides = [], dashes = [], dragged = false, startX = null;

  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function go(i) { if (i < 0) return; idx = i % list.length; update(); }

  function build() {
    list = PROJECTS.filter(function (p) { return filter === 'all' || p.k === filter; });
    idx = 0;
    slidesEl.innerHTML = '';
    dashesEl.innerHTML = '';
    slides = list.map(function (p, i) {
      var a = document.createElement('a');
      a.className = 'td-slide';
      a.href = p.page;
      a.draggable = false;
      a.setAttribute('style', SLIDE_STYLE + ' background-color: ' + p.bg + ';');
      var imgStyle = p.device ? 'width: 86%; height: 86%; object-fit: contain'
        : p.bare ? 'width: 92%; height: 92%; margin-top: auto; object-fit: contain; object-position: center bottom'
        : 'width: 84%; height: 80%; object-fit: cover; object-position: ' + (p.pos || 'center') + '; border-radius: 10px; box-shadow: 0 12px 30px rgba(15,34,51,.18)';
      a.innerHTML = '<img src="' + esc(p.img) + '" alt="" draggable="false" style="display: block; pointer-events: none; ' + imgStyle + '">';
      a.addEventListener('click', function (e) {
        if (dragged) { e.preventDefault(); dragged = false; return; }
        if (i !== idx) { e.preventDefault(); go(i); }
      });
      slidesEl.appendChild(a);
      return a;
    });
    dashes = list.map(function (p, i) {
      var b = document.createElement('button');
      b.className = 'td-dash';
      b.type = 'button';
      b.setAttribute('aria-label', 'Show ' + p.title);
      b.setAttribute('style', 'height: 44px; padding: 0; border: 0; background: transparent; cursor: pointer; display: flex; align-items: center');
      b.innerHTML = '<span style="display: block; height: 3px; border-radius: 2px"></span>';
      b.addEventListener('click', function () { go(i); });
      dashesEl.appendChild(b);
      return b;
    });
    pillsEl.querySelectorAll('button').forEach(function (b) {
      var on = b.getAttribute('data-f') === filter;
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
      b.style.background = on ? '#0F2233' : 'transparent';
      b.style.color = on ? '#F3F5F6' : '#0F2233';
      b.style.borderColor = on ? '#0F2233' : 'rgba(15,34,51,.35)';
    });
    update();
  }

  function update() {
    slides.forEach(function (a, i) {
      var d = i - idx, ad = Math.abs(d), p = list[i];
      a.style.transform = 'translateX(calc(-50% + ' + (d * 74) + '%)) translateZ(' + (-ad * 280) + 'px) rotateY(' + (-d * 34) + 'deg)';
      a.style.opacity = ad > 2 ? 0 : ad === 2 ? 0.18 : ad === 1 ? 0.42 : 1;
      a.style.zIndex = 10 - ad;
      a.style.pointerEvents = ad > 2 ? 'none' : 'auto';
      a.style.boxShadow = ad === 0 ? '0 30px 70px rgba(15,34,51,.22)' : '0 10px 24px rgba(15,34,51,.06)';
      a.tabIndex = ad === 0 ? 0 : -1;
      a.setAttribute('aria-label', ad === 0 ? p.title + ', open case study' : 'Show ' + p.title);
    });
    dashes.forEach(function (b, i) {
      var on = i === idx, bar = b.firstChild;
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
      bar.style.width = on ? '34px' : '18px';
      bar.style.background = on ? '#0F2233' : 'rgba(15,34,51,.3)';
    });
    counterEl.textContent = '0' + (idx + 1) + ' / 0' + list.length;
    prevBtn.hidden = idx === 0;
    var c = list[idx];
    // re-created on every change so the title animates in again
    currentEl.innerHTML =
      '<div class="td-title" style="display: flex; flex-direction: column; align-items: center; gap: 14px">' +
      '<p style="font-family: \'IBM Plex Mono\', \'Courier New\', monospace; margin: 0; font-size: 12px; font-weight: 500; letter-spacing: 0.2em; text-transform: uppercase; color: #2B3A48">' + esc(c.tag) + '</p>' +
      '<h1 style="margin: 0; font-family: \'Newsreader\', Georgia, serif; font-size: clamp(28px, min(5.2vw, 8.5vh), 84px); overflow-wrap: anywhere; font-weight: 300; line-height: 0.95; letter-spacing: -0.02em; color: #0F2233">' + esc(c.title) + '</h1>' +
      '<p class="td-desc" style="margin: 0; font-size: clamp(14px, 1.2vw, 16px); line-height: 1.6; color: #2B3A48">' + esc(c.desc) + '</p>' +
      '</div>';
  }

  // filter pills
  FILTERS.forEach(function (f) {
    var b = document.createElement('button');
    b.className = 'td-pill';
    b.type = 'button';
    b.setAttribute('data-f', f[0]);
    b.setAttribute('style', 'min-height: 44px; padding: 10px 18px; border-radius: 999px; border: 1px solid; font-family: inherit; font-size: 14px; font-weight: 600; cursor: pointer');
    b.textContent = f[1];
    b.addEventListener('click', function () { filter = f[0]; build(); });
    pillsEl.appendChild(b);
  });

  prevBtn.addEventListener('click', function () { go(idx - 1); });
  nextBtn.addEventListener('click', function () { go(idx + 1); });

  // drag / swipe on the stage
  stage.addEventListener('pointerdown', function (e) { startX = e.clientX; dragged = false; });
  stage.addEventListener('pointerup', function (e) {
    if (startX == null) return;
    var dx = e.clientX - startX; startX = null;
    if (Math.abs(dx) > 30) { dragged = true; go(idx + (dx < 0 ? 1 : -1)); }
  });

  // two-finger horizontal trackpad swipe (or shift + wheel): one project per gesture
  var acc = 0, locked = false, quiet = null;
  main.addEventListener('wheel', function (e) {
    var dx = e.deltaX;
    if (!dx && e.shiftKey) dx = e.deltaY;
    if (Math.abs(dx) <= Math.abs(e.shiftKey ? 0 : e.deltaY)) return;
    clearTimeout(quiet);
    quiet = setTimeout(function () { locked = false; acc = 0; }, 220);
    if (locked) return;
    acc += dx;
    if (Math.abs(acc) > 24) { locked = true; var dir = acc > 0 ? 1 : -1; acc = 0; go(idx + dir); }
  }, { passive: true });

  build();
})();
