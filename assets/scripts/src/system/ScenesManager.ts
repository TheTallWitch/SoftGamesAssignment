import * as PIXI from "pixi.js";
import { App } from "./App";
import { Scene } from "./Scene";

/**
 * This class manages scenes to be replaced with each other or shown as an overlay. Scenes will be removed and destroyed if they change
 */
export class ScenesManager {
    private _container: PIXI.Container;
    public get container(): PIXI.Container {
        return this._container;
    }

    private scene: Scene | null;

    constructor() {
        this._container = new PIXI.Container();
        this._container.eventMode = 'passive';
        this.scene = null;
    }

    start(scene: string) {
        let newScene: Scene | null = null;
        if (App.config.pages.hasOwnProperty(scene)) {
            if (this.scene)
                this.scene.remove();
            newScene = new App.config.pages[scene]();
        }
        else if (App.config.overlays.hasOwnProperty(scene)) {
            newScene = new App.config.overlays[scene]();
        }
        
        if (newScene) {
            this.container.addChild(newScene.container);
        }

        if (App.config.pages.hasOwnProperty(scene)) {
            this.scene = newScene;
        }
    }
}