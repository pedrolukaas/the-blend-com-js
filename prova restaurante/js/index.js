
const contador = document.getElementById("contador");

function atualizarContador() {
  const agora = new Date();

  const meiaNoite = new Date(agora);
  meiaNoite.setHours(24, 0, 0, 0);

  const restante = Math.max(0, meiaNoite - agora);

  const horas = Math.floor(restante / 3600000);
  const minutos = Math.floor((restante % 3600000) / 60000);
  const segundos = Math.floor((restante % 60000) / 1000);

  contador.textContent =
    `${String(horas).padStart(2, "0")}:` +
    `${String(minutos).padStart(2, "0")}:` +
    `${String(segundos).padStart(2, "0")}`;
}

atualizarContador();
setInterval(atualizarContador, 1000);
