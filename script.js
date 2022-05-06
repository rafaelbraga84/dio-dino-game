const dino = document.querySelector('.dino');

const background = document.querySelector('.background');

let pulando = false;

let gameOver = false;

let position = 0;

function pressionandoTecla(event) {

  if (event.keyCode === 32) {
    if (!pulando) {
      jump();

    }
  }
}

function jump() {

  pulando = true;

  let upInterval = setInterval(() => {

    if (position >= 150) {
    
      clearInterval(upInterval);

      let downInterval = setInterval(() => {

        if (position <= 0) {

          clearInterval(downInterval);
          pulando = false;

        } else {

          position -= 20;
          dino.style.bottom = position + 'px';

        }
      }, 20);

    } else {
      
      position += 20;
      dino.style.bottom = position + 'px';

    }
  }, 20);
}

function createCactus() {

  const cactus = document.createElement('div');
  let cactusPosition = 1000;
  let randomTime = Math.random() * 5000;

  if (gameOver) return;

  cactus.classList.add('cactus');
  background.appendChild(cactus);
  cactus.style.left = cactusPosition + 'px';

  let leftTimer = setInterval(() => {

    if (cactusPosition < -60) { // saiu da tela
      
      clearInterval(leftTimer);
      background.removeChild(cactus);

    } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) { // game over

      clearInterval(leftTimer);
      gameOver = true;
      document.body.innerHTML = '<h1 class="game-over">GAME OVER</h1>';

    } else {

      cactusPosition -= 10;
      cactus.style.left = cactusPosition + 'px';
    }

  }, 20);

  setTimeout(createCactus, randomTime);

}

createCactus();
document.addEventListener('keyup', pressionandoTecla);