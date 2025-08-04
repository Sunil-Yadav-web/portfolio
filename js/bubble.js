
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Scale for High DPI screens (e.g., Retina)
function resizeCanvas() {
  const ratio = window.devicePixelRatio || 1;
  canvas.width = window.innerWidth * ratio;
  canvas.height = window.innerHeight * ratio;
  canvas.style.width = window.innerWidth + "px";
  canvas.style.height = window.innerHeight + "px";
  ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset any transform
  ctx.scale(ratio, ratio); // Scale for crisp rendering
}
resizeCanvas();

// Debounce resize
let resizeTimeout;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(resizeCanvas, 100);
});

// Track mouse position
const mouse = { x: null, y: null };

// Store all particles
let particlesArray = [];

canvas.addEventListener("click", (e) => {
  updateMousePosition(e);
  generateParticles(100);
});

canvas.addEventListener("mousemove", (e) => {
  updateMousePosition(e);
  generateParticles(1);
});

function updateMousePosition(e) {
  const rect = canvas.getBoundingClientRect();
  mouse.x = e.clientX - rect.left;
  mouse.y = e.clientY - rect.top;
}

function generateParticles(count) {
  for (let i = 0; i < count; i++) {
    particlesArray.push(new Particle(mouse.x, mouse.y));
  }
}

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 14 + 8;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
    this.color = `hsl(${Math.random() * 360}, 100%, 70%)`;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.size *= 0.96; // Shrink gradually
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 0.5;
    ctx.stroke();
  }

  isAlive() {
    return this.size > 0.5;
  }
}

function handleParticles() {
  particlesArray = particlesArray.filter(p => {
    p.update();
    p.draw();
    return p.isAlive();
  });
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  handleParticles();
  requestAnimationFrame(animate);
}

animate();



