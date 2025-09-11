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
  window.innerHeight - 30,
  window.innerWidth,
  60,
  { isStatic: true, render: { fillStyle: "#2d5016" } }
);
World.add(world, ground);

// Center X position
const centerX = window.innerWidth / 2;
const baseY = 370;

// Body (main body stays upright)
const body = Bodies.rectangle(centerX, baseY, 320, 400, {
  background: "#ff030a",
  // render: {
  //   sprite: {
  //     texture: "./body.png",
  //     xScale: 1,
  //     yScale: 1
  //   }
  // },
  isStatic: true,
  inertia: Infinity // prevent rotation
});

// Tail
const tail = Bodies.rectangle(centerX - 150, baseY + 30, 90, 140, {
  background: "#0a3cfd",
  // render: {
  //   sprite: {
  //     texture: "./tail.png",
  //     xScale: 1,
  //     yScale: 1
  //   }
  // },
  inertia: Infinity
});

// Wings
const wingLeft = Bodies.rectangle(centerX - 150, baseY - 20, 46, 76, {
  background: "#1a1a2e",
  // render: {
  //   sprite: {
  //     texture: "./wing.png",
  //     xScale: 1,
  //     yScale: 1
  //   }
  //  },
  inertia: Infinity
});
const wingRight = Bodies.rectangle(centerX + 150, baseY - 20, 46, 76, {
  background: "#9354db",
  // render: {
  //   sprite: {
  //     texture: "./wing.png",
  //     xScale: 1,
  //     yScale: 1
  //   }
  // },
  inertia: Infinity
});

// Legs
const legLeft = Bodies.rectangle(centerX + 40, baseY + 150, 54, 63, {
  background: "#cd259c",
  // render: {
  //   sprite: {
  //     texture: "./leg.png",
  //     xScale: 1,
  //     yScale: 1
  //   }
  // },
  inertia: Infinity
});
const legRight = Bodies.rectangle(centerX - 40, baseY + 150, 54, 63, {
  background: "#6539ba",
  // render: {
  //   sprite: {
  //     texture: "./leg.png",
  //     xScale: 1,
  //     yScale: 1
  //   }
  // },
  inertia: Infinity
});

World.add(world, [body, tail, wingLeft, wingRight, legLeft, legRight]);

// Joints
const joints = [
  Constraint.create({
    bodyA: body,
    pointA: { x: -80, y: 0 },
    bodyB: wingLeft,
    pointB: { x: 0, y: -35 },
    stiffness: 0,
    damping: 0,
    length: 0
  }),
  Constraint.create({
    bodyA: body,
    pointA: { x: 80, y: 0 },
    bodyB: wingRight,
    pointB: { x: 0, y: 35 },
    stiffness: 0,
    damping: 0,
    length: 0
  }),
  Constraint.create({
    bodyA: body,
    pointA: { x: -40, y: 120 },
    bodyB: legLeft,
    pointB: { x: 0, y: -30 },
    stiffness: 0,
    damping: 0,
    length: 0
  }),
  Constraint.create({
    bodyA: body,
    pointA: { x: 40, y: 120 },
    bodyB: legRight,
    pointB: { x: 0, y: -30 },
    stiffness: 0,
    damping: 0,
    length: 0
  }),
  Constraint.create({
    bodyA: body,
    pointA: { x: -60, y: 90 },
    bodyB: tail,
    pointB: { x: 0, y: -40 },
    stiffness: 1,
    damping: 0,
    length: 0
  })
];
World.add(world, joints);

// Utility: oscillation function
function oscillate(time, speed, maxAngle) {
  return Math.sin(time * speed) * maxAngle;
}

// Animate wings, tail, and legs
Events.on(engine, "beforeUpdate", () => {
  const time = engine.timing.timestamp / 1000; // seconds

  // Wings flap smoothly ±45°
  const wingAngle = oscillate(time, 2, Math.PI / 6);
  Body.setAngle(wingLeft, -wingAngle + Math.PI / 2);
  Body.setAngle(wingRight, wingAngle + Math.PI / 2);

  // Tail sways ±20°
  const tailAngle = oscillate(time, 1.5, Math.PI / 9);
  Body.setAngle(tail, tailAngle + Math.PI / 4);

  // Keep body upright
  Body.setAngle(body, 0);
  Body.setAngularVelocity(body, 0);
});
