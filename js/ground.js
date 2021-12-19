import {
  getCustomProp,
  incrementCustomProp,
  setCustomProp,
} from './updateCutomProp.js';

const SPEED = 0.05;

const groundElms = document.querySelectorAll('[data-ground]');

export function setupGround() {
  setCustomProp(groundElms[0], '--left', 0);
  setCustomProp(groundElms[1], '--left', 300);
}

export function updateGround(delta, speedScale) {
  groundElms.forEach((ground) => {
    incrementCustomProp(ground, '--left', delta * speedScale * SPEED * -1);

    if (getCustomProp(ground, '--left') <= -300) {
      incrementCustomProp(ground, '--left', 600);
    }
  });
}
