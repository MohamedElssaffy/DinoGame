import {
  setCustomProp,
  getCustomProp,
  incrementCustomProp,
} from './updateCutomProp.js';

const SPEED = 0.05;
const CACTUS_INT_MIN = 500;
const CACTUS_INT_MAX = 1500;

const worldElm = document.querySelector('[data-world]');

let nextCactusTime;

export function setupCactus() {
  nextCactusTime = CACTUS_INT_MIN;
  document
    .querySelectorAll('[data-cactus]')
    .forEach((cactus) => cactus.remove());
}

export function updateCactus(delta, speedScale) {
  document.querySelectorAll('[data-cactus]').forEach((cactus) => {
    incrementCustomProp(cactus, '--left', delta * SPEED * speedScale * -1);

    if (getCustomProp(cactus, '--left') <= -100) {
      cactus.remove();
    }
  });

  if (nextCactusTime <= 0) {
    creatCactus();
    nextCactusTime =
      randomNumBetween(CACTUS_INT_MIN, CACTUS_INT_MAX) / speedScale;
  }
  nextCactusTime -= delta;
}

export function getCactusRect() {
  return [...document.querySelectorAll('[data-cactus]')].map((cactus) => {
    return cactus.getBoundingClientRect();
  });
}

function creatCactus() {
  const cactus = document.createElement('img');
  cactus.dataset.cactus = true;
  cactus.src = 'images/cactus.png';
  cactus.classList.add('cactus');
  setCustomProp(cactus, '--left', 100);
  worldElm.append(cactus);
}

function randomNumBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
