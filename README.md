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
  Exibe vídeos sequenciais da pasta `videos/` com transição automática. Todos os vídeos são padronizados para resolução 1440x720 para manter a consistência visual.

- 🕒 **Relógio em tempo real**  
  Mostra a hora atual e a data completa com atualização contínua, exibida no topo direito da tela.

- 🌤️ **Previsão do tempo (implementada)**  
  Mostra os próximos dias da semana com ícone e temperatura mínima/máxima, com layout responsivo e leve.

- 📰 **Notícias dinâmicas**  
  Mostra automaticamente as últimas manchetes em destaque com horário e título, atualizando conforme o conteúdo muda.

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
