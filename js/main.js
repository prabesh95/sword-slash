import Game from "./game.js";

window.addEventListener("load", () => {
  const gameaudio = new Audio();
  gameaudio.src = "sound/Woodland Fantasy.mp3";
  const loading = document.querySelector("h1");
  loading.style.display = "none";
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = 1145;
  canvas.height = 527;
  const game = new Game(ctx, canvas.width, canvas.height);
  ctx.font = "50px Helvetica";
  // Animation function
  let lastTime = 0;
  function animation(timeStamp) {
    let deltatime = timeStamp - lastTime;
    lastTime = timeStamp;

    game.draw(ctx, deltatime);
    game.update(deltatime, gameaudio);

    requestAnimationFrame(animation);
  }
  animation(0);
});
