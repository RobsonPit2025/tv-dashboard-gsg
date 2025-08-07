# 📺 TV Dashboard GSG Telecom

Este projeto é um painel visual responsivo desenvolvido para exibição em televisores, com foco em informações úteis para clientes da GSG Telecom. Ele é exibido em tela cheia com imagem de fundo personalizada, adaptado para diferentes resoluções de TV.

---
## 🚀 Tecnologias utilizadas

- **HTML5**
- **CSS3**
- **JavaScript Puro (Vanilla JS)**

---
## 🎯 Funcionalidades

- 🎥 **Slider automático de vídeos promocionais**  
  Exibe vídeos sequenciais da pasta `videos/` com transição automática e efeito de opacidade suave.

- 🕒 **Relógio em tempo real**  
  Mostra a hora atual e a data completa com atualização contínua, exibida no topo direito da tela.

- 🌤️ **Previsão do tempo (implementada)**  
  Mostra os próximos dias da semana com ícone e temperatura mínima/máxima, utilizando a API do OpenWeatherMap.

- 📰 **Notícias dinâmicas com rolagem automática**  
  Integração com a API da [NewsData.io](https://newsdata.io/) para exibir notícias da cidade de Salvador.
  - Atualização automática a cada 30 minutos.
  - Exibe até 5 notícias recentes com título, fonte e data (ex: *Atarde • 07/08/2025*).
  - Rolagem automática vertical contínua para visualização dinâmica em painéis de TV.

- 🖼️ **Imagem de fundo personalizada**  
  O projeto permite uso de imagens `.jpeg` como plano de fundo, criadas no Canva com dimensões otimizadas para TVs (ex: 1920x1080 ou 1440x810).  

- 🎯 **Design responsivo e legível para telas grandes**  
  Todo o painel foi otimizado com `vw` e `vh` no CSS para ajustar tamanhos de fonte e espaçamentos para diferentes resoluções, sem perder legibilidade.

---
## 📁 Estrutura de pastas

```
/tv-dashboard-gsg
├── index.html
├── style.css
├── script.js
├── fundo.jpeg
├── /videos
│   ├── video1.mp4
│   ├── video2.mp4
│   └── ...
└── README.md
```

---
## 📌 Observações

- Os vídeos devem estar com resolução padronizada (1440x720).
- O layout foi ajustado para evitar cortes em logotipos e bordas durante a troca de vídeos.
- O projeto pode ser expandido com integração a APIs de clima e notícias.

---
👨‍💻 Desenvolvido por Robson Fernandes – 2025
