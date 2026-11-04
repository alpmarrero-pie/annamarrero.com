// Image viewer for case studies.
// Any button with class "cs-zoom" that contains an <img> opens that image full screen.
// Click the image (or "Zoom in") to see it at full size; Esc or "Close" exits.
(function () {
  var lb = document.getElementById('lb');
  if (!lb) return;
  var img = document.getElementById('lb-img');
  var cap = document.getElementById('lb-cap');
  var toggle = document.getElementById('lb-toggle');
  var close = document.getElementById('lb-close');
  var backdrop = document.getElementById('lb-backdrop');
  var base = img.getAttribute('style') || '';
  var FIT = 'max-width: 100%; max-height: 100%; width: auto; height: auto; object-fit: contain; cursor: zoom-in';
  var FULL = 'width: min(2600px, 240vw); max-width: none; max-height: none; height: auto; cursor: zoom-out';
  var zoomed = false;
  var opener = null;

  function setZoom(z) {
    zoomed = z;
    img.setAttribute('style', base + ' ' + (z ? FULL : FIT));
    toggle.textContent = z ? 'Fit to screen' : 'Zoom in';
  }
  function open(btn) {
    var src = btn.querySelector('img');
    if (!src) return;
    opener = btn;
    img.src = src.getAttribute('src');
    img.alt = src.getAttribute('alt') || '';
    cap.textContent = img.alt;
    setZoom(false);
    lb.hidden = false;
    close.focus();
  }
  function shut() {
    lb.hidden = true;
    img.removeAttribute('src');
    if (opener && opener.focus) opener.focus();
  }

  document.addEventListener('click', function (e) {
    var btn = e.target.closest && e.target.closest('.cs-zoom');
    if (btn) open(btn);
  });
  toggle.addEventListener('click', function (e) { e.stopPropagation(); setZoom(!zoomed); });
  img.addEventListener('click', function (e) { e.stopPropagation(); setZoom(!zoomed); });
  close.addEventListener('click', shut);
  backdrop.addEventListener('click', function (e) { if (e.target === backdrop) shut(); });
  window.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape' || lb.hidden) return;
    if (zoomed) setZoom(false); else shut();
  });
})();
