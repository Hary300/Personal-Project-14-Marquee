const track = document.querySelector('.logo-track');

// infinite loop
let position = 0;
let speed = 1;

function animate() {
  if (!isDragging) {
    position -= speed;
  }

  track.style.transform = `translateX(${position}px)`;

  const half = track.scrollWidth / 2;

  if (position <= -half) {
    position += half;
  }

  requestAnimationFrame(animate);
}

// drag feature
let isDragging = false;
let startX;
let currentX;
let previousPosition = 0;
let currentTranslate = 0;

track.addEventListener('mousedown', (e) => {
  isDragging = true;
  startX = e.clientX;
  previousPosition = position;
});

document.addEventListener('mousemove', function (e) {
  if (!isDragging) return;
  currentX = e.clientX;

  const deltaX = currentX - startX;

  position = previousPosition + deltaX;

  track.style.cursor = 'grabbing';
});

document.addEventListener('mouseup', function () {
  isDragging = false;
  track.style.cursor = 'grab';
});
animate();
