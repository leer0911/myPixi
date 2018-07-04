import * as PIXI from 'pixi.js';
import scaleToWindow from './utils/scaleToWindow';
const app = new PIXI.Application();
const renderer = app.renderer;
const view = app.renderer.view;
view.style.position = 'absolute';
view.style.display = 'block';
renderer.autoResize = true;
renderer.resize(940, 530);
window.addEventListener('resize', function(event) {
  scaleToWindow(renderer.view);
});
document.body.appendChild(app.view);
