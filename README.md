# Sora The Birdie
An interactive experiment using **Matter.js physics engine** and **Web Audio API** to bring a cute bird character to life.  
The bird flaps, jumps, and changes expressions in sync with the beat of the background music, creating a fun music-visualization effect.

---

## Inspired From
https://pablotheflamingo.com/
---

## 🚀 Features
- **Physics-driven bird** assembled from multiple body parts using [Matter.js](https://brm.io/matter-js/).
- **Audio beat detection** using the Web Audio API for real-time frequency analysis.
- **Dynamic animations**:
  - Body jumps on beats.
  - Wings flap smoothly, speed adjusting with music intensity.
  - Tail wiggles continuously.
  - Fingers and legs move responsively.
  - Eyes change expression on play/pause.
- **Responsive design**: adjusts positioning dynamically for small screens.
- Clean **Geist font** styling with background artwork.

---

## 📸 Preview

<img width="1918" height="939" alt="Screenshot 2025-09-24 165320" src="https://github.com/user-attachments/assets/b69243cf-db2e-4ec1-811d-9df5c40ec7eb" />

---

## 🌐 Live Demo
Try it out live here:  
👉 [Live Demo Link](https://sohamgoswami07.github.io/Sora-The-Birdie/)

---

## 🛠️ Tech Stack
- **HTML5**
- **CSS3** (with custom button + background styling)
- **JavaScript (ES6+)**
- **Matter.js** for physics-based character assembly
- **Web Audio API** for beat detection & audio synchronization

---

## 📦 Installation & Setup

1. **Clone the repo**
   ```bash
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
    ```

---

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run locally**

   ```bash
   npm run dev
   ```

4. Open in your browser at:

   ```
   http://localhost:5173
   ```

---

## ⚙️ How It Works

* The bird is built from **separate textures** (`body.png`, `wings.png`, `tail.png`, `legs.png`, `fingers.png`, `eyes.png`, `nose.png`) stitched together with **Matter.js constraints**.
* The **Web Audio API** analyses bass frequencies to detect beats.
* Beat detection drives:

  * **Jumping height** of the body.
  * **Wing flap speed & amplitude**.
  * **Eye expressions** toggle (happy on play, angry on pause).
* **Continuous tail wiggle** adds realism.
* The **Play/Pause button** controls both music and animation states.

---

## 🙌 Acknowledgements

* [Matter.js](https://brm.io/matter-js/) for 2D physics.
* [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) for real-time audio analysis.
* Inspired by fun interactive character experiments.
