// import matter.js
import Matter from 'matter-js';

const { Engine, Render, Runner, World, Bodies, Body, Events, Constraint } = Matter;

// Setup engine + world
const engine = Engine.create();
const world = engine.world;
engine.gravity.y = 0;

// Renderer
const render = Render.create({
  element: document.body,
  engine,
  options: {
    width: window.innerWidth,
    height: window.innerHeight,
    wireframes: false,
    background: "#1a1a2e",
  }
});
Render.run(render);
Runner.run(Runner.create(), engine);

// Ground
const ground = Bodies.rectangle(
  window.innerWidth / 2,
  window.innerHeight - 40,
  window.innerWidth,
  100,
  { isStatic: true, render: { fillStyle: "#2d5016" } }
);
World.add(world, ground);

// Center X position
const centerX = window.innerWidth / 2;
const baseY = 370;

// Body and parts
const body = Bodies.rectangle(centerX, baseY, 320, 400, {
  render: { sprite: { texture: "./figure/body.png", xScale: 1, yScale: 1 } },
  isStatic: true,
  inertia: Infinity
});
const nose = Bodies.rectangle(centerX, baseY, 31, 21, {
  render: { sprite: { texture: "./figure/nose.png", xScale: 1, yScale: 1 } },
  isStatic: true,
  inertia: Infinity
});
const eye = Bodies.rectangle(centerX, baseY, 148, 55, {
  render: { sprite: { texture: "./figure/happy eyes.png", xScale: 1, yScale: 1 } },
  isStatic: true,
  inertia: Infinity
});
const tail = Bodies.rectangle(centerX - 150, baseY + 30, 50, 50, {
  render: { sprite: { texture: "./figure/tail.png", xScale: 1, yScale: 1 } },
  inertia: Infinity
});
const wingLeft = Bodies.rectangle(centerX - 150, baseY - 20, 46, 76, {
  render: { sprite: { texture: "./figure/wing.png", xScale: 1, yScale: 1 } },
  inertia: Infinity
});
const wingRight = Bodies.rectangle(centerX + 150, baseY - 20, 46, 76, {
  render: { sprite: { texture: "./figure/wing.png", xScale: 1, yScale: 1 } },
  inertia: Infinity
});
const legLeft = Bodies.rectangle(centerX + 40, baseY + 150, 13, 70, {
  render: { sprite: { texture: "./figure/leg.png", xScale: 1, yScale: 1 } },
  inertia: Infinity
});
const legRight = Bodies.rectangle(centerX - 40, baseY + 150, 13, 70, {
  render: { sprite: { texture: "./figure/leg.png", xScale: 1, yScale: 1 } },
  inertia: Infinity
});
const fingerOne = Bodies.rectangle(centerX + 40, baseY + 150, 13, 35, {
  render: { sprite: { texture: "./figure/finger.png", xScale: 1, yScale: 1 } },
  inertia: Infinity
});
const fingerTwo = Bodies.rectangle(centerX + 40, baseY + 150, 13, 35, {
  render: { sprite: { texture: "./figure/finger.png", xScale: 1, yScale: 1 } },
  inertia: Infinity
});
const fingerThree = Bodies.rectangle(centerX - 40, baseY + 150, 13, 35, {
  render: { sprite: { texture: "./figure/finger.png", xScale: 1, yScale: 1 } },
  inertia: Infinity
});
const fingerFour = Bodies.rectangle(centerX - 40, baseY + 150, 13, 35, {
  render: { sprite: { texture: "./figure/finger.png", xScale: 1, yScale: 1 } },
  inertia: Infinity
});

// Add bodies to world (note: removed eye and nose constraints)
World.add(world, [tail, wingLeft, wingRight, fingerOne, fingerTwo, fingerThree, fingerFour, legRight, legLeft, body, eye, nose]);

// Joints (removed eye and nose constraints to make them independent)
const joints = [
  Constraint.create({ bodyA: body, pointA: { x: -130, y: 0 }, bodyB: wingLeft, pointB: { x: 0, y: -35 }, stiffness: 0, length: 0, render: { visible: false } }),
  Constraint.create({ bodyA: body, pointA: { x: 130, y: 0 }, bodyB: wingRight, pointB: { x: 0, y: 35 }, stiffness: 0, length: 0, render: { visible: false } }),
  Constraint.create({ bodyA: body, pointA: { x: -40, y: 190 }, bodyB: legLeft, pointB: { x: 0, y: -30 }, stiffness: 1, length: 0, render: { visible: false } }),
  Constraint.create({ bodyA: body, pointA: { x: 40, y: 190 }, bodyB: legRight, pointB: { x: 0, y: -30 }, stiffness: 1, length: 0, render: { visible: false } }),
  Constraint.create({ bodyA: body, pointA: { x: 40, y: 220 }, bodyB: fingerOne, pointB: { x: 0, y: -15 }, stiffness: 1, length: 0, render: { visible: false } }),
  Constraint.create({ bodyA: body, pointA: { x: 40, y: 220 }, bodyB: fingerTwo, pointB: { x: 0, y: -15 }, stiffness: 1, length: 0, render: { visible: false } }),
  Constraint.create({ bodyA: body, pointA: { x: -40, y: 220 }, bodyB: fingerThree, pointB: { x: 0, y: -15 }, stiffness: 1, length: 0, render: { visible: false } }),
  Constraint.create({ bodyA: body, pointA: { x: -40, y: 220 }, bodyB: fingerFour, pointB: { x: 0, y: -15 }, stiffness: 1, length: 0, render: { visible: false } }),
  Constraint.create({ bodyA: body, pointA: { x: -120, y: 150 }, bodyB: tail, pointB: { x: 0, y: -40 }, stiffness: 1, length: 0, render: { visible: false } })
];
World.add(world, joints);

// ------------------- Utility -------------------
function oscillate(time, speed, maxAngle) {
  return Math.sin(time * speed) * maxAngle;
}

// ------------------- Audio Setup -------------------
const audio = new Audio("./music/music.mp3");
audio.loop = true;
audio.preload = "auto";

let ctx = null;
let analyser, dataArray, bufferLength;

function setupAudioNodes() {
  // create the AudioContext only after a user gesture
  if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();

  if (analyser) return; // already set

  const src = ctx.createMediaElementSource(audio);
  analyser = ctx.createAnalyser();
  analyser.fftSize = 256;
  bufferLength = analyser.frequencyBinCount;
  dataArray = new Uint8Array(bufferLength);

  src.connect(analyser);
  analyser.connect(ctx.destination);
}

// Beat detection vars
const BEAT_HISTORY = 43;
const energyHistory = new Array(BEAT_HISTORY).fill(0);
let historyPos = 0;
let beatPulse = 0;

function detectBeat() {
  if (!analyser) return;
  analyser.getByteFrequencyData(dataArray);
  const bassEnd = Math.max(2, Math.floor(bufferLength * 0.12));
  let sum = 0;
  for (let i = 0; i < bassEnd; i++) sum += dataArray[i];
  const bassAvg = sum / bassEnd;
  const historyAvg = energyHistory.reduce((a, b) => a + b, 0) / BEAT_HISTORY;

  energyHistory[historyPos] = bassAvg;
  historyPos = (historyPos + 1) % BEAT_HISTORY;

  const threshold = 1.45;
  if (bassAvg > historyAvg * threshold && bassAvg > 120) {
    beatPulse = Math.min(1.5, 0.8 + bassAvg / 255);
  }
}

function updateAudioData() {
  detectBeat();
  requestAnimationFrame(updateAudioData);
}

// ------------------- Play/Pause button -------------------
const playBtn = document.getElementById("audioControls");
let isPlaying = false;

function setEyeExpression(expression) {
  if (expression === "happy") {
    eye.render.sprite.texture = "./figure/surprised eyes.png";
  } else if (expression === "angry") {
    eye.render.sprite.texture = "./figure/angry eyes.png";
  }
}

playBtn.addEventListener("click", async () => {
  if (!analyser) setupAudioNodes();
  await ctx.resume();

  if (!isPlaying) {
    try {
      await audio.play();
      isPlaying = true;
      audio.muted = false;
      playBtn.textContent = "⏸️ Pause Music";
      updateAudioData();

    // Change to happy eyes
    setEyeExpression("happy");

    } catch (err) {
      console.error("Music play failed:", err);
    }
  } else {
    audio.pause();
    isPlaying = false;
    playBtn.textContent = "▶️ Play Music";

    // Change to sad eyes
    setEyeExpression("angry");
  }
});

// ------------------- Autoplay on page load -------------------
window.addEventListener("load", async () => {
  if (!analyser) setupAudioNodes();
  await ctx.resume();

  try {
    audio.muted = true;
    await audio.play();
    isPlaying = true;
    playBtn.textContent = "⏸️ Pause Music";
    updateAudioData();

    setTimeout(() => {
      audio.muted = false;
    }, 500);
  } catch (err) {
    console.warn("Autoplay blocked, waiting for user click...");
    playBtn.textContent = "▶️ Play Music";
  }
});

// ------------------- Animations -------------------
let stopTransition = false;

Events.on(engine, "beforeUpdate", () => {
  const time = engine.timing.timestamp / 500;

  if (isPlaying) {
    stopTransition = false;

    // Wings flap with beat
    const wingAngle = oscillate(time, 2, Math.PI / 6 * (1 + beatPulse * 0.6));
    Body.setAngle(wingLeft, -wingAngle + Math.PI / 2);
    Body.setAngle(wingRight, wingAngle + Math.PI / 2);

    // Fingers flap
    const fingerBase = Math.PI / 4;
    const fingerOsc = oscillate(time, 2, Math.PI / 12);
    Body.setAngle(fingerOne, -fingerBase + fingerOsc);
    Body.setAngle(fingerTwo, fingerBase - fingerOsc);
    Body.setAngle(fingerThree, -fingerBase + fingerOsc);
    Body.setAngle(fingerFour, fingerBase - fingerOsc);

    // Body jump synced with beats (smooth)
    const targetY = baseY + Math.sin(time * 2) * -40;
    const currentY = body.position.y;
    const smoothY = currentY + (targetY - currentY) * 0.05;
    Body.setPosition(body, { x: centerX, y: smoothY });

    // Calculate body movement delta
    const bodyMovement = smoothY - baseY;
    
    // Add additional upward movement when dancing
    const eyeExtraOffset = Math.sin(time * 2) * -14; // Double the original 7 pixels
    const noseExtraOffset = Math.sin(time * 2) * -14; // Double the original 7 pixels
    
    Body.setPosition(eye, { 
      x: centerX, 
      y: baseY - 55 + bodyMovement + eyeExtraOffset
    });
    Body.setPosition(nose, { 
      x: centerX, 
      y: baseY - 10 + bodyMovement + noseExtraOffset
    });

    // Scale body back to normal when music plays
    const currentScaleY = body.render.sprite.yScale || 1;
    const targetScaleY = 1.0;
    const smoothScaleY = currentScaleY + (targetScaleY - currentScaleY) * 0.1;
    body.render.sprite.yScale = smoothScaleY;

    // Decay beat pulse
    beatPulse *= 0.92;
  } else {
    // Reset others to neutral pose when paused
    Body.setAngle(wingLeft, wingLeft.angle + (Math.PI / 6 - wingLeft.angle) * 0.1);
    Body.setAngle(wingRight, wingRight.angle + (Math.PI / 1.2 - wingRight.angle) * 0.1);
    Body.setAngle(fingerOne, (fingerOne.angle - 9) * 0.1);
    Body.setAngle(fingerTwo, fingerTwo.angle + (1 - fingerTwo.angle) * 0.1);
    Body.setAngle(fingerThree, (fingerThree.angle - 9) * 0.1);
    Body.setAngle(fingerFour, fingerFour.angle + (1 - fingerFour.angle) * 0.1);

    // Smooth transition for body Y position
    const currentY = body.position.y;
    const targetY = baseY + 40;
    const smoothY = currentY + (targetY - currentY) * 0.05;
    Body.setPosition(body, { x: centerX, y: smoothY });

    // Calculate body movement delta for paused state
    const bodyMovement = smoothY - baseY;
    
    // Eyes and nose move independently with body movement + 3 pixels
    const eyeMovement = bodyMovement + (bodyMovement < 0 ? 0 : 30);
    const noseMovement = bodyMovement + (bodyMovement < 0 ? 0 : 30);

    // Eyes and nose return to their positions relative to body movement
    Body.setPosition(eye, { 
      x: centerX, 
      y: baseY - 65 + eyeMovement // Moved up from -55 to -65
    });
    Body.setPosition(nose, { 
      x: centerX, 
      y: baseY - 20 + noseMovement // Moved up from -10 to -20
    });

    // Scale down body when music stops
    const currentScaleY = body.render.sprite.yScale || 1;
    const targetScaleY = 0.95;
    const smoothScaleY = currentScaleY + (targetScaleY - currentScaleY) * 0.1;
    body.render.sprite.yScale = smoothScaleY;
  }

  // Tail moves continuously no matter what
  const tailAngle = oscillate(time, 1.5, Math.PI / 9);
  Body.setAngle(tail, tailAngle + Math.PI / 4);

  // Keep body upright regardless
  Body.setAngle(body, 0);
  Body.setAngularVelocity(body, 0);
});