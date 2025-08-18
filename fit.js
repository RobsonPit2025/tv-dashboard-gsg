

(function() {
  const BASE_W = 1920;
  const BASE_H = 1080;
  const stage = document.getElementById('stage');

  function fit() {
    const W = window.innerWidth;
    const H = window.innerHeight;
    const scale = Math.min(W / BASE_W, H / BASE_H);
    stage.style.transform = `scale(${scale})`;
  }

  window.addEventListener('resize', fit);
  window.addEventListener('orientationchange', fit);
  document.addEventListener('DOMContentLoaded', fit);
})();