// Atualizar relógio em tempo real
function atualizarRelogio() {
  const agora = new Date()
  const horas = agora.getHours().toString().padStart(2, '0')
  const minutos = agora.getMinutes().toString().padStart(2, '0')
  document.getElementById("relogio").textContent = `${horas}:${minutos}`
}
setInterval(atualizarRelogio, 1000)
atualizarRelogio()

const video = document.getElementById("sliderVideo")
const totalVideos = 13
let videoIndex = 1

function trocarVideo() {
  video.src = `videos/video${videoIndex}.mp4`
  video.load()
  video.play()
  videoIndex++
  if (videoIndex > totalVideos) videoIndex = 1
}

// Troca para o primeiro vídeo e depois troca a cada vez que o vídeo termina
trocarVideo()

video.addEventListener("ended", trocarVideo)
