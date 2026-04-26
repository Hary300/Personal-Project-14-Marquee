const track = document.querySelector('.logo-track');

let isDragging = false;
let startX = 0;
let currentX = 0;

track.addEventListener('mousedown', (e) => {
  isDragging = true;
  startX = e.clientX;
});

document.addEventListener('mousemove', function (e) {
  if (!isDragging) return;
  currentX = e.clientX;

  const deltaX = currentX - startX;
});
