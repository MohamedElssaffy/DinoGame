import { setupGround, updateGround } from './ground.js';
import { setupDino, updateDino, getDinoRect, setDinoLose } from './dino.js';
import { setupCactus, updateCactus, getCactusRect } from './cactus.js';

const WORLD_WIDTH = 100;
const WORLD_HEIGHT = 30;
const SPEED_SCALE_INC = 0.00001;

const worldElm = document.querySelector('[data-world]');
const scoreElm = document.querySelector('[data-score]');
const startScreenElm = document.querySelector('[data-start-screen]');

setPixelToWorldScale();

window.addEventListener('resize', setPixelToWorldScale);

document.addEventListener('keydown', handleStart, { once: true });

let lastTime;
let speedScale;
let score;

function update(time) {
  if (lastTime == null) {
    lastTime = time;
    window.requestAnimationFrame(update);
    return;
  }

  const delta = time - lastTime;

  updateGround(delta, speedScale);
  updateDino(delta, speedScale);
  updateCactus(delta, speedScale);
  updateSpeedScale(delta);
  updateScore(delta);
  if (checkLose()) return handleLose();

  lastTime = time;
  window.requestAnimationFrame(update);
}

function checkLose() {
  const dinoRect = getDinoRect();
  return getCactusRect().some((rect) => isCollision(rect, dinoRect));
}

function isCollision(rect1, rect2) {
  return (
    rect1.left < rect2.right &&
    rect1.top < rect2.bottom &&
    rect1.right > rect2.left &&
    rect1.bottom > rect2.top
  );
}

function updateSpeedScale(delta) {
  speedScale += delta * SPEED_SCALE_INC;
}

function updateScore(delta) {
  score += delta * 0.01;
  scoreElm.textContent = Math.floor(score);
}

function handleStart() {
  lastTime = null;
  speedScale = 1;
  score = 0;
  startScreenElm.classList.add('hide');
  setupGround();
  setupDino();
  setupCactus();
  window.requestAnimationFrame(update);
}

function handleLose() {
  setDinoLose();
  setTimeout(() => {
    document.addEventListener('keydown', handleStart, { once: true });
    startScreenElm.classList.remove('hide');
  }, 150);
}

function setPixelToWorldScale() {
  let worldPixelScale;
  if (window.innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT) {
    worldPixelScale = window.innerWidth / WORLD_WIDTH;
  } else {
    worldPixelScale = window.innerHeight / WORLD_HEIGHT;
  }

  worldElm.style.width = `${worldPixelScale * WORLD_WIDTH}px`;
  worldElm.style.height = `${worldPixelScale * WORLD_HEIGHT}px`;
}
