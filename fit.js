/**
 * Sistema de Escala Melhorado para TVs
 * Versão otimizada para diferentes tamanhos e proporções de tela
 */

(function() {
  const BASE_W = 1920;
  const BASE_H = 1080;
  const MIN_SCALE = 0.3;
  const MAX_SCALE = 3.0;
  
  const stage = document.getElementById("stage");
  const stageWrapper = document.getElementById("stage-wrapper");
  
  if (!stage || !stageWrapper) {
    console.error("Elementos stage ou stage-wrapper não encontrados");
    return;
  }

  let currentScale = 1;
  let resizeTimeout;

  function detectTVType() {
    const W = window.innerWidth;
    const H = window.innerHeight;
    const aspectRatio = W / H;
    
    // Detectar tipo de TV baseado na resolução e proporção
    if (W <= 1366) return "small-tv";
    if (W <= 1920) return "standard-tv";
    if (W <= 2560) return "large-tv";
    if (aspectRatio > 2.3) return "ultrawide-tv";
    return "ultra-large-tv";
  }

  function calculateOptimalScale() {
    const W = window.innerWidth;
    const H = window.innerHeight;
    const aspectRatio = W / H;
    const baseAspectRatio = BASE_W / BASE_H;
    
    let scale;
    
    // Calcular escala baseada na menor dimensão para garantir que tudo caiba
    const scaleW = W / BASE_W;
    const scaleH = H / BASE_H;
    
    // Usar a menor escala para garantir que o conteúdo caiba completamente
    scale = Math.min(scaleW, scaleH);
    
    // Ajustes específicos para diferentes tipos de tela
    const tvType = detectTVType();
    
    switch(tvType) {
      case "small-tv":
        // TVs pequenas: priorizar legibilidade
        scale = Math.max(scale, 0.5);
        break;
        
      case "ultrawide-tv":
        // TVs ultra-wide: ajustar para melhor uso do espaço
        if (aspectRatio > 2.5) {
          scale = Math.min(scaleH * 1.1, scaleW);
        }
        break;
        
      case "ultra-large-tv":
        // TVs muito grandes: limitar escala máxima para evitar elementos gigantes
        scale = Math.min(scale, 2.5);
        break;
    }
    
    // Aplicar limites de escala
    scale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, scale));
    
    return scale;
  }

  function updateCSSVariables(scale) {
    const root = document.documentElement;
    root.style.setProperty("--scale-factor", scale);
    
    // Ajustar tamanho base da fonte baseado na escala
    const baseFontSize = Math.max(12, Math.min(32, 16 * scale));
    root.style.setProperty("--base-font-size", `${baseFontSize}px`);
  }

  function fit() {
    const W = window.innerWidth;
    const H = window.innerHeight;
    
    if (W === 0 || H === 0) return;
    
    const scale = calculateOptimalScale();
    
    // Aplicar transformação
    stage.style.transform = `scale(${scale})`;
    
    // Centralizar o stage
    const scaledW = BASE_W * scale;
    const scaledH = BASE_H * scale;
    
    // Calcular posição para centralizar
    const offsetX = (W - scaledW) / 2;
    const offsetY = (H - scaledH) / 2;
    
    stage.style.transformOrigin = "top left";
    stage.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${scale})`;
    
    // Atualizar variáveis CSS
    updateCSSVariables(scale);
    
    currentScale = scale;
    
    // Debug info (remover em produção)
    console.log(`TV Type: ${detectTVType()}, Resolution: ${W}x${H}, Scale: ${scale.toFixed(3)}`);
  }

  function debouncedFit() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(fit, 100);
  }

  function handleOrientationChange() {
    // Aguardar um pouco para a orientação se estabilizar
    setTimeout(fit, 300);
  }

  function handleVisibilityChange() {
    if (!document.hidden) {
      // Reajustar quando a página voltar a ficar visível
      setTimeout(fit, 100);
    }
  }

  // Event listeners
  window.addEventListener("resize", debouncedFit);
  window.addEventListener("orientationchange", handleOrientationChange);
  document.addEventListener("visibilitychange", handleVisibilityChange);
  
  // Inicialização
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", fit);
  } else {
    fit();
  }
  
  // Reajustar após carregamento completo
  window.addEventListener("load", () => {
    setTimeout(fit, 100);
  });

  // Expor função para uso externo se necessário
  window.tvDashboardFit = {
    fit: fit,
    getCurrentScale: () => currentScale,
    getTVType: detectTVType
  };

  // Monitorar mudanças no DOM que possam afetar o layout
  if (window.ResizeObserver) {
    const resizeObserver = new ResizeObserver(debouncedFit);
    resizeObserver.observe(stage);
  }

})();

