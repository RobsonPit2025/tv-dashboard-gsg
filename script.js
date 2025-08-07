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
    video.style.opacity = 0;
    video.style.transition = "opacity 2s ease";

    setTimeout(() => {
      video.pause();
      video.removeAttribute("src");
      video.load();

      const srcAtual = `videos/video${videoIndex}.mp4`;
      video.src = srcAtual;

      video.onended = () => {
        videoIndex = (videoIndex % totalVideos) + 1;
        tocarProximoVideo();
      };

      video.oncanplay = () => {
        video.play().then(() => {
          video.style.opacity = 1;
        }).catch((e) => {
          console.error("Erro ao reproduzir vídeo:", e);
        });
      };
    }, 2000); // Tempo da transição (em ms)
  }

  tocarProximoVideo();
}

// ===== NOTÍCIAS (NEWSData.io) =====
async function carregarNoticias() {
  const noticiasElement = document.getElementById("noticias");
  const url = "https://newsdata.io/api/1/news?apikey=pub_a6ee05e658c8484a8649bf33302d9f19&q=Salvador&language=pt&country=br";

  try {
    noticiasElement.innerHTML = `
      <div class="carregando">
        <div class="spinner"></div>
        Buscando notícias atualizadas...
      </div>
    `;

    const resposta = await fetch(url);
    const dados = await resposta.json();

    if (!dados.results || dados.results.length === 0) {
      throw new Error("Nenhuma notícia encontrada.");
    }

    const noticias = dados.results.slice(0, 5).map(noticia => {
      const titulo = noticia.title || "Sem título";
      const fonte = noticia.source_id || "Fonte desconhecida";
      const data = new Date(noticia.pubDate).toLocaleDateString("pt-BR");

      return `
        <div class="noticia-item">
          <div class="noticia-titulo">${titulo}</div>
          <div class="noticia-meta">${fonte} • ${data}</div>
        </div>
      `;
    }).join("");

    noticiasElement.innerHTML = `
      <div class="noticias-scroll">
        ${noticias}
      </div>
    `;

    setTimeout(iniciarRolagemNoticias, 200); // Aguarda o DOM atualizar antes de iniciar rolagem

  } catch (error) {
    console.error("Erro ao carregar notícias:", error);
    noticiasElement.innerHTML = `
      <div class="erro">
        ⚠️ Falha ao carregar notícias. Tente recarregar mais tarde.
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
  iniciarRolagemNoticias();
  // Atualizações periódicas
  setInterval(carregarNoticias, 1800000); // Atualiza a cada 30 minutos
  setInterval(carregarPrevisaoDias, 10800000); // Atualiza a cada 3 horas
});

function iniciarRolagemNoticias() {
  const container = document.querySelector(".noticias-scroll");
  if (!container) return;

  container.style.overflowY = "hidden";
  container.style.maxHeight = "200px";
  container.style.position = "relative";

  let scrollPos = 0;
  const velocidade = 1; // pixels por passo
  const intervalo = 100; // milissegundos entre passos (mais lento)

  function rolar() {
    scrollPos += velocidade;

    if (scrollPos >= container.scrollHeight - container.clientHeight) {
      scrollPos = 0;
    }

    container.scrollTop = scrollPos;
  }

  setInterval(rolar, intervalo);
}