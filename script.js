console.log("script.js carregado");

function flip(n) {
  const page = document.getElementById("page" + n);
  if (page) {
    page.classList.add("flipped");
  }
}

function unflip(n) {
  // agora remove o flipped da MESMA página
  const page = document.getElementById("page" + n);
  if (page) {
    page.classList.remove("flipped");
  }
}
