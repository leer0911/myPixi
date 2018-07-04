import * as PIXI from 'pixi.js';

export default class Game {
  constructor() {
    // 添加别名
    this.Application = PIXI.Application;
    this.Sprite = PIXI.Sprite;
    this.app = new this.Application(940, 530);
    this.stage = this.app.stage;
    this.renderer = this.app.renderer;
    this.view = this.renderer.view;
    this.loader = PIXI.loader;
    this.resources = PIXI.loader.resources;

    this.ready();
  }
  ready() {
    this.loader.add(['assets/img/ui/menu-background.jpg']).load(() => {
      this.initGame();
    });
    document.querySelector('body').appendChild(this.view);
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
