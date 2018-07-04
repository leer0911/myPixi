import * as PIXI from 'pixi.js';

export default class Game {
  constructor() {
    this.Application = PIXI.Application;
    this.Sprite = PIXI.Sprite;
    this.app = new this.Application(940, 530);
    this.stage = this.app.stage;
    this.loader = PIXI.loader;
    this.resources = PIXI.loader.resources;
    this.loader.add(['assets/img/ui/menu-background.jpg']).load(() => {
      this.initGame();
    });
    document.querySelector('body').appendChild(this.app.renderer.view);
  }
  initGame() {
    this.loadBackgrounds();
  }
  loadBackgrounds() {
    const bg = new this.Sprite(
      this.resources['assets/img/ui/menu-background.jpg'].texture
    );
    this.stage.addChild(bg);
  }
}
