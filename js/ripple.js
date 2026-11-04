// Homepage intro: a frosted layer clears from the centre while a ripple bends the page.
// If this script fails, CSS fades the frost out on its own after ~4.5s.
(function () {
  var surf = document.getElementById('hb-surface');
  var frost = document.getElementById('hb-frost');
  var filter = document.getElementById('hb-ripple');
  var map = document.getElementById('hb-ripple-map');
  if (!surf || !frost) return;
  function finish() { surf.style.filter = 'none'; if (frost.parentNode) frost.parentNode.removeChild(frost); }
  if ((window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) || !filter || !map) { finish(); return; }

  var MW = 144, MH = 90, W = 0, H = 0;
  var mc = document.createElement('canvas'); mc.width = MW; mc.height = MH;
  var mctx = mc.getContext('2d');
  var img = mctx.createImageData(MW, MH);

  function size() {
    W = surf.clientWidth; H = surf.clientHeight;
    filter.setAttribute('width', String(W)); filter.setAttribute('height', String(H));
    map.setAttribute('width', String(W)); map.setAttribute('height', String(H));
  }
  function mask(r) {
    var m = 'radial-gradient(circle at 50% 50%, transparent ' + r + 'px, #000 ' + (r + 220) + 'px)';
    frost.style.webkitMaskImage = m; frost.style.maskImage = m;
  }
  function frame(t) {
    var START = 0.5, END = 3.8, s = t - START;
    if (s < 0) return true;
    if (s > END) { finish(); window.removeEventListener('resize', size); return false; }
    var cx = W / 2, cy = H / 2;
    var maxR = Math.hypot(cx, cy) + 260;
    var p = Math.min(s / 2.7, 1);
    var R = maxR * (1 - Math.pow(1 - p, 2.2));
    var A = s < 0.15 ? s / 0.15 : 1 - Math.max(0, Math.min(1, (s - 1.9) / 1.6));
    A = A * A * (3 - 2 * A);
    var K = 6.2832 / 110, DECAY = 230, TAIL = 700;
    var data = img.data, sx = W / MW, sy = H / MH, i = 0;
    for (var j = 0; j < MH; j++) {
      var y = (j + 0.5) * sy - cy;
      for (var k = 0; k < MW; k++) {
        var x = (k + 0.5) * sx - cx;
        var r = Math.sqrt(x * x + y * y) || 1;
        var d = R - r, h = 0;
        if (d > 0 && d < TAIL) h = A * Math.sin(d * K) * Math.exp(-d / DECAY) * Math.min(1, d / 22);
        data[i] = 128 + 127 * h * (x / r);
        data[i + 1] = 128 + 127 * h * (y / r);
        data[i + 2] = 128;
        data[i + 3] = 255;
        i += 4;
      }
    }
    mctx.putImageData(img, 0, 0);
    var url = mc.toDataURL();
    map.setAttribute('href', url);
    map.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', url);
    if (surf.style.filter !== 'url(#hb-ripple)') surf.style.filter = 'url(#hb-ripple)';
    mask(Math.max(-400, R - 90));
    return true;
  }

  window.addEventListener('resize', size);
  size();
  frost.style.opacity = '1';
  mask(-400);
  var start = performance.now();
  function loop(now) { if (frame((now - start) / 1000)) requestAnimationFrame(loop); }
  requestAnimationFrame(loop);
})();
