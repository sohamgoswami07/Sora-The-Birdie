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
    background: "transparent",
  }
});
Render.run(render);
Runner.run(Runner.create(), engine);

// Center X position
const centerX = window.innerWidth / 2;
const baseY = 260;

// Body and parts
const body = Bodies.rectangle(centerX, baseY, 320 * 0.85, 400 * 0.85, {
  render: { sprite: { texture: "./figure/body.png", xScale: 0.85, yScale: 0.85 } },
  isStatic: true,
  inertia: Infinity
});
const nose = Bodies.rectangle(centerX, baseY, 31 * 0.85, 21 * 0.85, {
  render: { sprite: { texture: "./figure/nose.png", xScale: 0.85, yScale: 0.85 } },
  isStatic: true,
  inertia: Infinity
});
const eye = Bodies.rectangle(centerX, baseY, 148 * 0.85, 55 * 0.85, {
  render: { sprite: { texture: "./figure/happy eyes.png", xScale: 0.85, yScale: 0.85 } },
  isStatic: true,
  inertia: Infinity
});
const tail = Bodies.rectangle(centerX, baseY, 50 * 0.85, 50 * 0.85, {
  render: { sprite: { texture: "./figure/tail.png", xScale: 0.85, yScale: 0.85 } },
  inertia: Infinity
});
const wingLeft = Bodies.rectangle(centerX, baseY, 46 * 0.85, 76 * 0.85, {
  render: { sprite: { texture: "./figure/wing.png", xScale: 0.85, yScale: 0.85 } },
  inertia: Infinity
});
const wingRight = Bodies.rectangle(centerX, baseY, 46 * 0.85, 76 * 0.85, {
  render: { sprite: { texture: "./figure/wing.png", xScale: 0.85, yScale: 0.85 } },
  inertia: Infinity
});
const legLeft = Bodies.rectangle(centerX, baseY, 13 * 0.85, 70 * 0.85, {
  render: { sprite: { texture: "./figure/legOne.png", xScale: 0.85, yScale: 0.85 } },
  inertia: Infinity
});
const legRight = Bodies.rectangle(centerX, baseY, 13 * 0.85, 70 * 0.85, {
  render: { sprite: { texture: "./figure/legTwo.png", xScale: 0.85, yScale: 0.85 } },
  inertia: Infinity
});
const fingerOne = Bodies.rectangle(centerX, baseY, 13 * 0.85, 35 * 0.85, {
  render: { sprite: { texture: "./figure/fingerTwo.png", xScale: 0.85, yScale: 0.85 } },
  inertia: Infinity
});
const fingerTwo = Bodies.rectangle(centerX, baseY, 13 * 0.85, 35 * 0.85, {
  render: { sprite: { texture: "./figure/fingerOne.png", xScale: 0.85, yScale: 0.85 } },
  inertia: Infinity
});
const fingerThree = Bodies.rectangle(centerX, baseY, 13 * 0.85, 35 * 0.85, {
  render: { sprite: { texture: "./figure/fingerTwo.png", xScale: 0.85, yScale: 0.85 } },
  inertia: Infinity
});
const fingerFour = Bodies.rectangle(centerX, baseY, 13 * 0.85, 35 * 0.85, {
  render: { sprite: { texture: "./figure/fingerOne.png", xScale: 0.85, yScale: 0.85 } },
  inertia: Infinity
});

// Add bodies to world
World.add(world, [tail, wingLeft, wingRight, fingerOne, fingerTwo, fingerThree, fingerFour, legRight, legLeft, body, eye, nose]);

// Joints
const joints = [
  Constraint.create({ bodyA: body, pointA: { x: -110, y: 0 }, bodyB: wingLeft, pointB: { x: 0, y: -30 }, stiffness: 0, length: 0, render: { visible: false }}),
  Constraint.create({ bodyA: body, pointA: { x: 110, y: 0 }, bodyB: wingRight, pointB: { x: 0, y: 30 }, stiffness: 0, length: 0, render: { visible: false }}),
  Constraint.create({ bodyA: body, pointA: { x: -100, y: 120 }, bodyB: tail, pointB: { x: 0, y: -40 }, stiffness: 1, length: 0, render: { visible: false }}),
  Constraint.create({ bodyA: body, pointA: { x: -40, y: 160 }, bodyB: legLeft, pointB: { x: 0, y: -25 }, stiffness: 1, lengt: 0, render: { visible: false }}),
  Constraint.create({ bodyA: body, pointA: { x: 40, y: 160 }, bodyB: legRight, pointB: { x: 0, y: -25 }, stiffness: 1, length: 0, render: { visible: false }}),
  Constraint.create({ bodyA: body, pointA: { x: 40, y: 185 }, bodyB: fingerOne, pointB: { x: 0, y: -13 }, stiffness: 1, length: 0, render: { visible: false }}),
  Constraint.create({ bodyA: body, pointA: { x: 37, y: 183 }, bodyB: fingerTwo, pointB: { x: 0, y: -13 }, stiffness: 1, length: 0, render: { visible: false }}),
  Constraint.create({ bodyA: body, pointA: { x: -37, y: 185 }, bodyB: fingerThree, pointB: { x: 0, y: -13 }, stiffness: 1, length: 0, render: { visible: false }}),
  Constraint.create({ bodyA: body, pointA: { x: -40, y: 185 }, bodyB: fingerFour, pointB: { x: 0, y: -13 }, stiffness: 1, length: 0, render: { visible: false }})
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
  if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
  if (analyser) return;

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
let smoothedBeatPulse = 0;

function detectBeat() {
  if (!analyser) return;
  analyser.getByteFrequencyData(dataArray);

  // Focus on bass frequencies (first ~12% of FFT)
  const bassEnd = Math.max(2, Math.floor(bufferLength * 0.12));
  let sum = 0;
  for (let i = 0; i < bassEnd; i++) sum += dataArray[i];
  const bassAvg = sum / bassEnd;

  // Adaptive thresholding
  const historyAvg = energyHistory.reduce((a, b) => a + b, 0) / BEAT_HISTORY;
  energyHistory[historyPos] = bassAvg;
  historyPos = (historyPos + 1) % BEAT_HISTORY;

  // Improved beat detection (peak-based)
  const isBeat = (bassAvg > historyAvg * 1.3 && bassAvg > 100);

  if (isBeat) {
    // Push pulse higher when beat detected
    beatPulse = Math.min(2.0, beatPulse + 0.5);
  }

  // Decay smoothly
  beatPulse *= 0.95;
  if (beatPulse < 0.05) beatPulse = 0.05;
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
      playBtn.textContent = "l l Pause";
      updateAudioData();

      setEyeExpression("happy");

    } catch (err) {
      console.error("Music play failed:", err);
    }
  } else {
    audio.pause();
    isPlaying = false;
    playBtn.textContent = "▶ Play";

    setEyeExpression("angry");
  }
});

// ------------------- Animations -------------------
Events.on(engine, "beforeUpdate", () => {
  const time = engine.timing.timestamp / 500;

  if (isPlaying) {
    // Smooth beat response
    smoothedBeatPulse += (beatPulse - smoothedBeatPulse) * 0.08;

    // Body jump (smooth, synced mainly with height not speed)
    const jumpHeight = 15 + smoothedBeatPulse * 40;  // scale height only
    const jumpSpeed = 2.2; // keep constant frequency for smoothness
    const targetY = baseY + Math.sin(time * jumpSpeed) * -jumpHeight;

    const currentY = body.position.y;
    const smoothY = currentY + (targetY - currentY) * 0.06;
    Body.setPosition(body, { x: centerX, y: smoothY });

    // Wings flap (smooth, slower on strong beats)
    const wingBaseSpeed = 2.2;
    const wingSpeed = Math.max(1.0, wingBaseSpeed - (jumpHeight / 120)); 
    const targetWingAngle = oscillate(time, wingSpeed, Math.PI / 7 * (1 + smoothedBeatPulse * 0.5));

    // Smoothly interpolate wing angles toward target
    const smoothWingLeft = wingLeft.angle + ((-targetWingAngle + Math.PI / 2) - wingLeft.angle) * 0.12;
    const smoothWingRight = wingRight.angle + ((targetWingAngle + Math.PI / 2) - wingRight.angle) * 0.12;

    Body.setAngle(wingLeft, smoothWingLeft);
    Body.setAngle(wingRight, smoothWingRight);

    // Fingers (smooth, independent of beat, reset to base position)
    const fingerBase = Math.PI / 4; // outward tilt as in your original code
    const fingerOsc = oscillate(time, 2, Math.PI / 18); // small smooth flap
    Body.setAngle(fingerOne, -fingerBase + fingerOsc);
    Body.setAngle(fingerTwo, fingerBase - fingerOsc);
    Body.setAngle(fingerThree, -fingerBase + fingerOsc);
    Body.setAngle(fingerFour, fingerBase - fingerOsc);

    // Move eyes and nose with body
    const bodyMovement = smoothY - baseY;
    const eyeExtraOffset = Math.sin(time * jumpSpeed) * -8;
    const noseExtraOffset = Math.sin(time * jumpSpeed) * -8;

    Body.setPosition(eye, { 
      x: centerX, 
      y: baseY - 55 + bodyMovement + eyeExtraOffset
    });
    Body.setPosition(nose, { 
      x: centerX, 
      y: baseY - 10 + bodyMovement + noseExtraOffset
    });

    // Reset scale back to normal
    const currentScaleY = body.render.sprite.yScale || 0.85;
    const targetScaleY = 0.85;
    const smoothScaleY = currentScaleY + (targetScaleY - currentScaleY) * 0.1;
    body.render.sprite.yScale = smoothScaleY;

  } else {
    // Reset pose when paused
    Body.setAngle(wingLeft, wingLeft.angle + (Math.PI / 6 - wingLeft.angle) * 0.1);
    Body.setAngle(wingRight, wingRight.angle + (Math.PI / 1.2 - wingRight.angle) * 0.1);
    
    Body.setAngle(fingerOne, (fingerOne.angle - 9) * 0.1);
    Body.setAngle(fingerTwo, fingerTwo.angle + (1 - fingerTwo.angle) * 0.1);
    Body.setAngle(fingerThree, (fingerThree.angle - 9) * 0.1);
    Body.setAngle(fingerFour, fingerFour.angle + (1 - fingerFour.angle) * 0.1);

    const currentY = body.position.y;
    const targetY = baseY + 40;
    const smoothY = currentY + (targetY - currentY) * 0.05;
    Body.setPosition(body, { x: centerX, y: smoothY });

    const bodyMovement = smoothY - baseY;
    Body.setPosition(eye, { x: centerX, y: baseY - 65 + bodyMovement });
    Body.setPosition(nose, { x: centerX, y: baseY - 20 + bodyMovement });

    const currentScaleY = body.render.sprite.yScale || 0.85;
    const targetScaleY = 0.85;
    const smoothScaleY = currentScaleY + (targetScaleY - currentScaleY) * 0.1;
    body.render.sprite.yScale = smoothScaleY;
  }

  // Tail wiggle always
  const tailAngle = oscillate(time, 1.5, Math.PI / 9);
  Body.setAngle(tail, tailAngle + Math.PI / 4);

  // Keep body upright
  Body.setAngle(body, 0);
  Body.setAngularVelocity(body, 0);
});