// Atualiza o relógio em tempo real
function atualizarRelogio() {
  const agora = new Date()
  const horas = agora.getHours().toString().padStart(2, '0')
  const minutos = agora.getMinutes().toString().padStart(2, '0')
  const segundos = agora.getSeconds().toString().padStart(2, '0')
  
  // Mostra com ou sem segundos
  document.getElementById("relogio").textContent = `${horas}:${minutos}` // ou `${horas}:${minutos}:${segundos}`
}
setInterval(atualizarRelogio, 1000)
atualizarRelogio()

// Slider de vídeos
const video = document.getElementById("sliderVideo")
const totalVideos = 13
let videoIndex = 1

function trocarVideo() {
  video.style.opacity = 0 // esconde o vídeo antes de trocar
  video.src = `videos/video${videoIndex}.mp4`
  video.load()
  video.play()
  videoIndex++
  if (videoIndex > totalVideos) videoIndex = 1
}

// Quando o vídeo carregar, mostra com fade
video.addEventListener("loadeddata", () => {
  video.style.opacity = 1
})

// Inicia com o primeiro vídeo
trocarVideo()

// Troca de vídeo ao terminar
video.addEventListener("ended", trocarVideo)
