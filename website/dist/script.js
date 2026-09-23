// Confirmed contact destination for Mozart Financial.
const CONTACT_URL = 'https://calendly.com/parthpahuja/30min?month=2026-09';
const CONTACT_LABEL = 'Prefer email? start@mozart.financial';
document.querySelector('#contact-cta').href = CONTACT_URL;
document.querySelector('#contact-email').textContent = CONTACT_LABEL;
document.querySelector('#year').textContent = new Date().getFullYear();

const field = document.querySelector('#score-bars');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const heights = [19,32,48,26,64,45,72,38,57,83,48,66,35,79,52,92,59,73,41,68,87,48,64,34,75,55,88,43,65,37,53,72,45,61,29,47,34,21];
const bars = heights.map((height, index) => {
  const bar = document.createElement('span');
  bar.className = 'score-bar';
  bar.style.setProperty('--bar-height', `${height}%`);
  bar.style.setProperty('--bar-offset', `${Math.sin(index * 1.9) * 28}px`);
  bar.style.setProperty('--bar-opacity', index % 5 === 0 ? '.82' : '.28');
  field.append(bar);
  return bar;
});
let paused = reducedMotion.matches;
let inSync = false;
let interval;

function compose() {
  inSync = !inSync;
  bars.forEach((bar, index) => {
    const wave = 22 + 53 * Math.abs(Math.sin(index * .18));
    bar.style.setProperty('--bar-height', `${inSync ? wave : heights[index]}%`);
    bar.style.setProperty('--bar-offset', inSync ? '0px' : `${Math.sin(index * 1.9) * 28}px`);
    bar.style.setProperty('--bar-opacity', inSync ? '.65' : index % 5 === 0 ? '.82' : '.28');
  });
}
function updateMotion() {
  clearInterval(interval);
  if (!paused && !document.hidden) interval = setInterval(compose, 3300);
}
reducedMotion.addEventListener('change', event => { paused = event.matches; updateMotion(); });
document.addEventListener('visibilitychange', updateMotion);
updateMotion();
