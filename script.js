const player = document.getElementById("player");
const hurdle = document.getElementById("hurdle");

// Jump on key press
document.addEventListener("keydown", e => {
  if (e.code === "Space" || e.code === "ArrowUp") {
    jump();
  }
});

// Jump function
function jump() {
  if (!player.classList.contains("jump")) {
    player.classList.add("jump");
    setTimeout(() => {
      player.classList.remove("jump");
    }, 600);
  }
}

// Collision detection
let isAlive = setInterval(() => {
  const playerBottom = parseInt(window.getComputedStyle(player).getPropertyValue("bottom"));
  const hurdleLeft = parseInt(window.getComputedStyle(hurdle).getPropertyValue("left"));

  if (hurdleLeft < 100 && hurdleLeft > 50 && playerBottom < 40) {
    alert("💥 Game Over! Press OK to play again.");
    location.reload();
  }
}, 10);
