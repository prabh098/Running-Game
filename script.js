const player = document.getElementById("player");
const pipeTop = document.getElementById("pipeTop");
const pipeBottom = document.getElementById("pipeBottom");
const scoreDisplay = document.getElementById("score");

// --- GAME CONSTANTS ---
const GAME_HEIGHT = 400;      // same as .game height
const PLAYER_SIZE = 40;       // same as #player size
const GRAVITY = 0.45;         // softer gravity
const JUMP_STRENGTH = -6;   // not too strong
const MAX_FALL_SPEED = 8;     // cap falling speed
const GAP_SIZE = 140;         // space between pipes
const PIPE_SPEED = 2.4;       // slower horizontal speed

// --- GAME STATE ---
let playerY = 180;
let velocity = 0;
let pipeX = 600;
let score = 0;
let isGameOver = false;

// --- INPUT: JUMP ON KEY PRESS ---
document.addEventListener("keydown", e => {
  if (e.code === "Space" || e.code === "ArrowUp") {
    jump();
  }
});

function jump() {
  if (isGameOver) return;
  velocity = JUMP_STRENGTH;
}

// --- RANDOMIZE PIPES ---
function randomizePipes() {
  // height of top pipe between 60 and 240
  const topHeight = Math.floor(Math.random() * 180) + 60;

  pipeTop.style.height = topHeight + "px";

  const bottomHeight = GAME_HEIGHT - topHeight - GAP_SIZE;
  pipeBottom.style.height = bottomHeight + "px";
  pipeBottom.style.top = (topHeight + GAP_SIZE) + "px";
}

// --- COLLISION CHECK ---
function checkCollision() {
  const playerRect = player.getBoundingClientRect();
  const topRect = pipeTop.getBoundingClientRect();
  const bottomRect = pipeBottom.getBoundingClientRect();

  // Slightly shrink the player hitbox to feel fairer
  const padding = 5;
  const pLeft = playerRect.left + padding;
  const pRight = playerRect.right - padding;
  const pTop = playerRect.top + padding;
  const pBottom = playerRect.bottom - padding;

  const hitTop =
    pRight > topRect.left &&
    pLeft < topRect.right &&
    pTop < topRect.bottom;

  const hitBottom =
    pRight > bottomRect.left &&
    pLeft < bottomRect.right &&
    pBottom > bottomRect.top;

  if (hitTop || hitBottom) {
    endGame();
  }
}

// --- GAME OVER ---
function endGame() {
  if (isGameOver) return;
  isGameOver = true;
  alert("💥 Game Over! Score: " + score + "\nPress OK to restart.");
  location.reload();
}

// --- MAIN GAME LOOP ---
function gameLoop() {
  if (isGameOver) return;

  // Apply gravity
  velocity += GRAVITY;
  if (velocity > MAX_FALL_SPEED) velocity = MAX_FALL_SPEED;

  playerY += velocity;

  // Floor and ceiling limits
  const floorY = GAME_HEIGHT - PLAYER_SIZE;
  if (playerY > floorY) {
    playerY = floorY;
    endGame();
  }

  if (playerY < 0) {
    playerY = 0;
    velocity = 0;
  }

  player.style.top = playerY + "px";

  // Move pipes
  pipeX -= PIPE_SPEED;
  if (pipeX < -60) {
    pipeX = 600;
    score++;
    scoreDisplay.innerText = "Score: " + score;
    randomizePipes();
  }

  pipeTop.style.left = pipeX + "px";
  pipeBottom.style.left = pipeX + "px";

  // Check collision
  checkCollision();

  requestAnimationFrame(gameLoop);
}

// --- START GAME ---
randomizePipes();
gameLoop();
