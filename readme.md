# Infinite Logo Slider (Auto Scroll + Drag)

## 🖼️ Preview

![Preview](./images/preview.png)

## 📌 Overview

Project ini adalah implementasi **infinite logo slider** yang:

- Auto scroll terus-menerus
- Bisa di-drag oleh user
- Tidak menggunakan CSS animation (full JavaScript control)
- Smooth karena menggunakan `requestAnimationFrame`

---

## 🚀 Features

- ✅ Auto scroll (berjalan otomatis)
- ✅ Drag interaction (klik & geser)
- ✅ Infinite loop (tanpa loncat)
- ✅ Smooth animation (60fps-friendly)
- ✅ No CSS animation conflict

---

## 🧠 Core Concepts

### 1. Single Source of Truth (Position)

Semua pergerakan dikontrol oleh satu variabel:

```js
let position = 0;
```

👉 Ini adalah “state utama” dari slider

---

### 2. Auto Scroll Logic

```js
if (!isDragging) {
  position -= speed;
}
```

👉 Slider bergerak otomatis ke kiri selama tidak di-drag

---

### 3. Drag Logic

```js
const deltaX = currentX - startX;
position = previousPosition + deltaX;
```

👉 Saat drag:

- Hitung pergeseran mouse (`deltaX`)
- Tambahkan ke posisi sebelumnya

---

### 4. Rendering (Transform)

```js
track.style.transform = `translateX(${position}px)`;
```

👉 Semua render hanya dilakukan di `animate()`

---

### 5. Infinite Loop

```js
const half = track.scrollWidth / 2;

if (position <= -half) {
  position += half;
}
```

👉 Trick:

- Duplicate content (A B C D → A B C D A B C D)
- Reset di tengah agar seamless

---

### 6. requestAnimationFrame

```js
requestAnimationFrame(animate);
```

👉 Fungsi animasi dijalankan setiap frame browser
👉 Hasil:

- Lebih smooth
- Sinkron dengan render
- Lebih efisien

---

## 🧱 Full Code

```js
const track = document.querySelector('.logo-track');

// infinite loop
let position = 0;
let speed = 1;

function animate() {
  if (!isDragging) {
    position -= speed;
  }

  const half = track.scrollWidth / 2;

  if (position <= -half) {
    position += half;
  }

  track.style.transform = `translateX(${position}px)`;

  requestAnimationFrame(animate);
}

// drag feature
let isDragging = false;
let startX;
let currentX;
let previousPosition = 0;

track.addEventListener('mousedown', (e) => {
  isDragging = true;
  startX = e.clientX;
  previousPosition = position;
});

document.addEventListener('mousemove', (e) => {
  if (!isDragging) return;

  currentX = e.clientX;
  const deltaX = currentX - startX;

  position = previousPosition + deltaX;
});

document.addEventListener('mouseup', () => {
  isDragging = false;
});

animate();
```

---

## 🎯 Key Takeaways

- Animasi yang smooth = sinkron dengan frame browser
- `requestAnimationFrame` lebih baik dari `setInterval`
- Jangan update `transform` di banyak tempat → cukup di satu loop
- Drag = update state, bukan langsung render
- Infinite slider = duplicate content + reset di tengah

---

## 🔥 Next Improvements (Optional)

- Inertia / momentum drag (lempar seperti HP)
- Touch support (mobile)
- Snap ke item
- Add easing animation

---

## 📦 Conclusion

Project ini mengajarkan:

- Dasar animasi modern di web
- Cara kerja frame browser
- State management sederhana untuk UI
- Cara menghindari konflik antara animation & interaction

---

Happy coding 🚀
