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

// ============================
// SWIPE NO CELULAR (TOUCH)
// ============================

(function() {
  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  if (!isTouch) return; // só ativa em dispositivos touch

  let startX = 0;
  let startY = 0;
  let endX = 0;
  let endY = 0;

  const threshold = 50; // mínimo de movimento horizontal em px para contar como swipe

  document.addEventListener('touchstart', function(e) {
    const touch = e.changedTouches[0];
    startX = touch.screenX;
    startY = touch.screenY;
  }, { passive: true });

  document.addEventListener('touchend', function(e) {
    const touch = e.changedTouches[0];
    endX = touch.screenX;
    endY = touch.screenY;

    const diffX = endX - startX;
    const diffY = endY - startY;

    // ignora se arrastou mais na vertical que na horizontal (scroll normal)
    if (Math.abs(diffY) > Math.abs(diffX)) return;

    if (Math.abs(diffX) < threshold) return; // movimento muito pequeno

    if (diffX < 0) {
      // swipe para ESQUERDA -> AVANÇAR página
      nextPage();
    } else {
      // swipe para DIREITA -> VOLTAR página
      prevPage();
    }
  }, { passive: true });

  // funções auxiliares usando a sua lógica de flip/unflip
  function getCurrentPage() {
    const pages = document.querySelectorAll('.page');
    for (let i = 0; i < pages.length; i++) {
      if (!pages[i].classList.contains('flipped')) {
        return i + 1; // id page1 => índice 1
      }
    }
    return 1;
  }

  function nextPage() {
    const current = getCurrentPage();
    const pages = document.querySelectorAll('.page');
    if (current < pages.length) {
      flip(current); // mesma função que o botão "avançar" já usa
    }
  }

  function prevPage() {
    const current = getCurrentPage();
    if (current > 1) {
      unflip(current - 1); // mesma lógica do botão "voltar"
    }
  }
})();
