// Atualizar relógio em tempo real
function atualizarRelogio() {
  const agora = new Date()
  const horas = agora.getHours().toString().padStart(2, '0')
  const minutos = agora.getMinutes().toString().padStart(2, '0')
  document.getElementById("relogio").textContent = `${horas}:${minutos}`
}
setInterval(atualizarRelogio, 1000)
atualizarRelogio()
