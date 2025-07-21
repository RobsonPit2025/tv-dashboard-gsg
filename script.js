// ===== RELÓGIO =====
function atualizarRelogio() {
  const agora = new Date();
  const options = { 
    weekday: 'long', 
    day: 'numeric', 
    month: 'long',
    year: 'numeric'
  };
  
  document.getElementById("hora").textContent = 
    agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  
  document.getElementById("data").textContent = 
    agora.toLocaleDateString('pt-BR', options);
}

// ===== SLIDER (VERSÃO CORRIGIDA) =====
function iniciarSlider() {
  const video = document.getElementById("sliderVideo");
  const totalVideos = 13;
  let videoIndex = 1;

  function ajustarTamanho() {
    const containerRatio = video.parentElement.offsetWidth / video.parentElement.offsetHeight;
    const videoRatio = video.videoWidth / video.videoHeight;
    
    if (videoRatio > containerRatio) {
      video.style.width = '100%';
      video.style.height = 'auto';
    } else {
      video.style.width = 'auto';
      video.style.height = '100%';
    }
  }

  function trocarVideo() {
    video.style.opacity = 0;
    
    const nextVideo = document.createElement('video');
    nextVideo.src = `videos/video${videoIndex}.mp4`;
    nextVideo.preload = "auto";
    
    nextVideo.onloadeddata = () => {
      video.src = nextVideo.src;
      video.load();
      
      video.onloadedmetadata = () => {
        ajustarTamanho();
        video.play()
          .then(() => {
            video.style.opacity = 1;
          })
          .catch(e => {
            console.error("Erro ao reproduzir:", e);
            setTimeout(trocarVideo, 2000);
          });
      };
    };
    
    nextVideo.onerror = () => {
      videoIndex = videoIndex % totalVideos + 1;
      setTimeout(trocarVideo, 2000);
    };
    
    videoIndex = videoIndex % totalVideos + 1;
  }

  window.addEventListener('resize', ajustarTamanho);
  video.addEventListener("ended", trocarVideo);
  video.addEventListener("error", trocarVideo);
  trocarVideo();
}

// ===== CLIMA =====
async function carregarClima() {
  const climaElement = document.getElementById("clima");
  
  try {
    climaElement.innerHTML = `
      <div class="carregando">
        <div class="spinner"></div>
        Carregando dados do clima...
      </div>
    `;
    
    // Simulação de API
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const climas = [
      { dia: "Hoje", temp: "28°C", icon: "☀️", condicao: "Ensolarado" },
      { dia: "Amanhã", temp: "26°C", icon: "⛅", condicao: "Parc. nublado" },
      { dia: "Sex", temp: "24°C", icon: "🌧️", condicao: "Chuva leve" },
      { dia: "Sáb", temp: "27°C", icon: "☀️", condicao: "Ensolarado" }
    ];
    
    climaElement.innerHTML = climas.map(clima => `
      <div class="previsao">
        <div class="dia-semana">${clima.dia}</div>
        <div class="icone-clima">${clima.icon}</div>
        <div class="temperatura">${clima.temp}</div>
        <div class="condicao">${clima.condicao}</div>
      </div>
    `).join('');
    
  } catch (error) {
    console.error("Erro ao carregar clima:", error);
    climaElement.innerHTML = `
      <div class="erro">
        ⚠️ Não foi possível carregar os dados do clima
      </div>
    `;
  }
}

// ===== NOTÍCIAS =====
async function carregarNoticias() {
  const noticiasElement = document.getElementById("noticias");
  
  try {
    noticiasElement.innerHTML = `
      <div class="carregando">
        <div class="spinner"></div>
        Buscando notícias atualizadas...
      </div>
    `;
    
    // Simulação de API
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const noticias = [
      { 
        titulo: "Novo acordo comercial global é assinado entre 15 países", 
        fonte: "BBC Brasil",
        hora: "há 2 horas"
      },
      { 
        titulo: "Tecnologia revolucionária promete reduzir custos de energia", 
        fonte: "TecMundo",
        hora: "há 4 horas"
      }
    ];
    
    noticiasElement.innerHTML = noticias.map(noticia => `
      <div class="noticia-item">
        <div class="noticia-titulo">${noticia.titulo}</div>
        <div class="noticia-fonte">${noticia.fonte} • ${noticia.hora}</div>
      </div>
    `).join('');
    
  } catch (error) {
    console.error("Erro ao carregar notícias:", error);
    noticiasElement.innerHTML = `
      <div class="erro">
        ⚠️ Falha ao carregar notícias. Tente recarregar a página.
      </div>
    `;
  }
}

// ===== INICIALIZAÇÃO =====
document.addEventListener("DOMContentLoaded", () => {
  atualizarRelogio();
  setInterval(atualizarRelogio, 1000);
  
  iniciarSlider();
  carregarClima();
  carregarNoticias();
  
  // Atualizações periódicas
  setInterval(carregarClima, 3600000);
  setInterval(carregarNoticias, 3600000);
});