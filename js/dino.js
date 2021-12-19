import {
  setCustomProp,
  incrementCustomProp,
  getCustomProp,
} from './updateCutomProp.js';

const JUMP_SPEED = 0.45;
const GRAVITY = 0.0015;
const DINO_FRAM_COUNT = 2;
const FRAM_TIME = 100;

const dinoElm = document.querySelector('[data-dino]');

let isJumping;
let dinoFram;
let currentFramTime;
let yVelocity;

export function setupDino() {
  isJumping = false;
  dinoFram = 0;
  currentFramTime = 0;
  yVelocity = 0;
  setCustomProp(dinoElm, '--bottom', 0);
  document.removeEventListener('keydown', onJump);
  document.addEventListener('keydown', onJump);
}

export function updateDino(delta, speedScale) {
  handleRun(delta, speedScale);
  handleJump(delta);
}

export function getDinoRect() {
  return dinoElm.getBoundingClientRect();
}

export function setDinoLose() {
  dinoElm.src = 'images/dino-lose.png';
}

function handleRun(delta, speedScale) {
  if (isJumping) {
    dinoElm.src = 'images/dino-stationary.png';
    return;
  }

  if (currentFramTime >= FRAM_TIME) {
    dinoFram = (dinoFram + 1) % DINO_FRAM_COUNT;
    dinoElm.src = `images/dino-run-${dinoFram}.png`;
    currentFramTime -= FRAM_TIME;
  }

  currentFramTime += delta * speedScale;
}

function handleJump(delta) {
  if (!isJumping) return;

  incrementCustomProp(dinoElm, '--bottom', yVelocity * delta);

  if (getCustomProp(dinoElm, '--bottom') <= 0) {
    setCustomProp(dinoElm, '--bottom', 0);
    isJumping = false;
  }

  yVelocity -= GRAVITY * delta;
}

function onJump(e) {
  if (e.code !== 'Space' || isJumping) return;

  isJumping = true;
  yVelocity = JUMP_SPEED;
}
