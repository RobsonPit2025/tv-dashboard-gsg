document.addEventListener("DOMContentLoaded", function() {
  // Forçar reajuste após um pequeno delay para garantir que tudo carregou
  setTimeout(function() {
    if (window.tvDashboardFit) {
      window.tvDashboardFit.fit();
    }
  }, 100);

  // Detectar se está rodando em uma TV/display grande
  if (window.innerWidth > 1920 || window.innerHeight > 1080) {
    document.body.classList.add("large-display");
  }

  // Otimização para performance em TVs
  if ("requestIdleCallback" in window) {
    requestIdleCallback(function() {
      // Preload de recursos não críticos
      const preloadLinks = [
        "videos/video1.mp4",
        "videos/video2.mp4"
      ];

      preloadLinks.forEach(function(url) {
        const link = document.createElement("link");
        link.rel = "preload";
        link.as = "video";
        link.href = url;
        document.head.appendChild(link);
      });
    });
  }
});

