import * as PIXI from 'pixi.js';
import { TweenLite } from 'gsap';
import assets from './assets.js';
import 'pixi-layers';
export default class Game {
  constructor() {
    // 添加别名
    this.Application = PIXI.Application;
    this.Sprite = PIXI.Sprite;
    this.app = new this.Application(1136, 745);
    this.stage = this.app.stage;
    this.renderer = this.app.renderer;
    this.screen = this.app.screen;
    this.view = this.renderer.view;
    this.loader = PIXI.loader;
    this.resources = PIXI.loader.resources;

    this.targetLoad = 0;
    this.easeLoad = 0;

    this.ready();
  }
  ready() {
    this.initLoader().then(() => {
      this.loader
        .add(assets.ui)
        .on('progress', this.loadProgressHandler.bind(this))
        .load(loader => {
          this.initGame(loader);
        });
    });
    document.querySelector('body').appendChild(this.view);
  }
  initGame(loader) {
    this.loadBackgrounds();
  }
  loadBackgrounds() {
    this.background = new this.Sprite(
      this.resources['assets/img/ui/menu-background.jpg'].texture
    );
    this.stage.addChild(this.background);
    this.background.alpha = 0;
    TweenLite.to(this.background, 0.6, { alpha: 1 });
    this.loaderBarHandler();
  }
  initLoader() {
    return new Promise(resolve => {
      this.loader.add(assets.loader).load(() => {
        this.loaderBarTexture();
        resolve();
      });
    });
  }
  loaderBarHandler() {
    let loaderBar = this.loaderBar.bar;
    let loaderFill = this.loaderBar.fill;
    let loaderFrame = this.loaderBar.frame;
    [loaderBar, loaderFill, loaderFrame].map(item => {
      this.setCenter(item);
    });
    this.loaderBar.addChild(loaderBar, loaderFill, loaderFrame);
    this.stage.addChild(this.loaderBar);
    this.loaderBar.fill.scale.x = 0;
    this.loaderBar.fill.anchor.set(0, 0.5);
  }
  loaderBarTexture() {
    this.loaderBar = new PIXI.Container();
    this.loaderBar.bar = new this.Sprite(
      this.resources['assets/img/loader/loader-bar.png'].texture
    );
    this.loaderBar.frame = new this.Sprite(
      this.resources['assets/img/loader/loader-frame.png'].texture
    );
    this.loaderBar.fill = new this.Sprite(
      this.resources['assets/img/loader/loader-fill.png'].texture
    );
  }
  loadProgressHandler(loader) {
    // console.log(this.loader.progress);
    TweenLite.to(this.loaderBar.fill.scale, 0.6, { x: 1 });
    // this.easeLoad += 0.3 * (this.targetLoad - this.easeLoad);
  }
  setCenter(el) {
    const w = this.screen.width / 2;
    const h = this.screen.height / 2;
    el.position.set(w, h);
    el.anchor.set(0.5, 0.5);
  }
}
