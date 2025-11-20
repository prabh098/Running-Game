const startBtn = document.getElementById("startBtn");
const player = document.getElementById("player");
const pipeTop = document.getElementById("pipeTop");
const pipeBottom = document.getElementById("pipeBottom");
const scoreDisplay = document.getElementById("score");

// --- CONSTANTS ---
const GAME_HEIGHT = 400;
const PLAYER_SIZE = 40;
const GRAVITY = 0.5;
const JUMP_STRENGTH = -6;
const MAX_FALL_SPEED = 7;
const GAP_SIZE = 140;
const PIPE_SPEED = 2.4;

// --- GAME STATE ---
let gameStarted = false;
let playerY = 180;
let velocity = 0;
let pipeX = 600;
let score = 0;
let isGameOver = false;

// Start Game
startBtn.onclick = () => {
  gameStarted = true;
  startBtn.style.display = "none";
  gameLoop();
};

// Jump
document.addEventListener("keydown", e => {
  if (!gameStarted) return;

  if (e.code === "Space" || e.code === "ArrowUp") {
    velocity = JUMP_STRENGTH;
  }
});

// Random pipes
function randomizePipes() {
  const topHeight = Math.floor(Math.random() * 180) + 60;
  pipeTop.style.height = topHeight + "px";

  const bottomHeight = GAME_HEIGHT - topHeight - GAP_SIZE;
  pipeBottom.style.height = bottomHeight + "px";
  pipeBottom.style.top = (topHeight + GAP_SIZE) + "px";
}

// Game Over
function endGame() {
  if (isGameOver) return;
  isGameOver = true;
  alert("💥 Game Over! Score: " + score + "\nPress OK to restart.");
  location.reload();
}

// Collision detection
function checkCollision() {
  const p = player.getBoundingClientRect();
  const t = pipeTop.getBoundingClientRect();
  const b = pipeBottom.getBoundingClientRect();

  if (
    (p.right > t.left && p.left < t.right && p.top < t.bottom) ||
    (p.right > b.left && p.left < b.right && p.bottom > b.top)
  ) {
    endGame();
  }
}

// Main loop
function gameLoop() {
  if (!gameStarted || isGameOver) return;

  velocity += GRAVITY;
  if (velocity > MAX_FALL_SPEED) velocity = MAX_FALL_SPEED;

  playerY += velocity;

  if (playerY > GAME_HEIGHT - PLAYER_SIZE) endGame();
  if (playerY < 0) playerY = 0;

  player.style.top = playerY + "px";

  pipeX -= PIPE_SPEED;
  if (pipeX < -60) {
    pipeX = 600;
    score++;
    scoreDisplay.innerText = "Score: " + score;
    randomizePipes();
  }

  pipeTop.style.left = pipeX + "px";
  pipeBottom.style.left = pipeX + "px";

  checkCollision();
  requestAnimationFrame(gameLoop);
}

// Initialization
randomizePipes();
