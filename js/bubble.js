const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

console.log(canvas);

let particlesArray = [];
window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const mouse = {
  x: null,
  y: null
};

canvas.addEventListener("click", function (e) {
  mouse.x = e.x;
  mouse.y = e.y;
  for (let i = 0; i < 100; i++) {
    particlesArray.push(new Particle());
  }
});

canvas.addEventListener("mousemove", function (e) {
  mouse.x = e.x;
  mouse.y = e.y;
  for (let i = 0; i < 1; i++) {
    particlesArray.push(new Particle());
  }
});
class Particle {
  constructor() {
    this.x = mouse.x;
    this.y = mouse.y;
    this.size = Math.random() * 20 + 1;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5 ;
    this.color = "#63e9eb";
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.size > 0.2) this.size -= 0.1;
  }

  draw() {
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 0.4;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.stroke();
  }
}

function handleParticle() {
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();

    if (particlesArray[i].size <= 0.3) {
      particlesArray.splice(i, 1);
      i--;
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  handleParticle();
  requestAnimationFrame(animate);
}
animate();

