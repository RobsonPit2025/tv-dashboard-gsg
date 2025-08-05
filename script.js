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

  function tocarProximoVideo() {
    // Pausa, limpa e troca o vídeo
    video.pause();
    video.removeAttribute("src");
    video.load();

    const srcAtual = `videos/video${videoIndex}.mp4`;
    video.src = srcAtual;

    video.onended = () => {
      videoIndex = (videoIndex % totalVideos) + 1;
      tocarProximoVideo();
    };

    video.play().catch((e) => {
      console.error("Erro ao reproduzir vídeo:", e);
    });
  }

  tocarProximoVideo();
}

// ===== NOTÍCIAS =====
async function carregarNoticias() {
  const noticiasElement = document.getElementById("noticias");
  const rssUrl = "https://g1.globo.com/rss/g1/";
  const url = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;

  try {
    noticiasElement.innerHTML = `
      <div class="carregando">
        <div class="spinner"></div>
        Buscando notícias atualizadas...
      </div>
    `;

    const resposta = await fetch(url);
    const dados = await resposta.json();

    const noticias = dados.items.slice(0, 5).map(noticia => `
      <div class="noticia-item">
        <div class="noticia-titulo">${noticia.title}</div>
        <div class="noticia-fonte">${new Date(noticia.pubDate).toLocaleString("pt-BR")}</div>
      </div>
    `).join('');

    noticiasElement.innerHTML = noticias;
  } catch (error) {
    console.error("Erro ao carregar notícias:", error);
    noticiasElement.innerHTML = `
      <div class="erro">
        ⚠️ Falha ao carregar notícias. Tente recarregar a página.
      </div>
    `;
  }
}

// ===== PREVISÃO PRÓXIMOS DIAS =====
async function carregarPrevisaoDias() {
  const previsaoContainer = document.getElementById("previsao-dias");
  const apiKey = "1bc7fb162e6e1c041b91966f0e9e8baa";
  const cidade = "Salvador,BR";
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${cidade}&appid=${apiKey}&units=metric&lang=pt_br`;

  try {
    const resposta = await fetch(url);
    const dados = await resposta.json();
    const dias = {};

    // Agrupar por dia
    dados.list.forEach(item => {
      const data = new Date(item.dt_txt);
      const dia = data.toLocaleDateString("pt-BR", { weekday: "short" });

      if (!dias[dia]) {
        dias[dia] = {
          tempMin: item.main.temp_min,
          tempMax: item.main.temp_max,
          icone: item.weather[0].icon
        };
      } else {
        dias[dia].tempMin = Math.min(dias[dia].tempMin, item.main.temp_min);
        dias[dia].tempMax = Math.max(dias[dia].tempMax, item.main.temp_max);
      }
    });

    // Pegar os próximos 4 dias (incluindo hoje)
    const chaves = Object.keys(dias).slice(0, 4);

    previsaoContainer.innerHTML = chaves.map(dia => `
      <div class="dia-item">
        <div class="dia">${dia}</div>
        <div class="icone"><img src="https://openweathermap.org/img/wn/${dias[dia].icone}.png" alt=""></div>
        <div class="temp">${Math.round(dias[dia].tempMin)}° / ${Math.round(dias[dia].tempMax)}°</div>
      </div>
    `).join("");
  } catch (e) {
    console.error("Erro ao buscar previsão estendida:", e);
  }
}

// ===== INICIALIZAÇÃO =====
document.addEventListener("DOMContentLoaded", () => {
  atualizarRelogio();
  setInterval(atualizarRelogio, 1000);
  
  iniciarSlider();
  carregarNoticias();
  carregarPrevisaoDias();
  // Atualizações periódicas
  setInterval(carregarNoticias, 3600000);
  setInterval(carregarPrevisaoDias, 10800000); // Atualiza a cada 3 horas
});