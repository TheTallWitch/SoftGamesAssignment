import * as PIXI from "pixi.js";
import { App } from "./App";

/**
 * This class creates a container to hold each scene and has overridable methods that enable create, update, destroy methods.
 */
export class Scene {
    private _container: PIXI.Container;
    public get container(): PIXI.Container {
        return this._container;
    }

    constructor() {
        this._container = new PIXI.Container();
        this.container.eventMode = 'passive';
        this.create();
        App.app.ticker.add(this.update, this);
    }

    /**
     * This method will be called to create the scene on initialization
     */
    create() {}

    /**
     * This method will be called to handle scenes in each frame
     */
    update() {}

    /**
     * This method will be called on removing the scene and each scene handles destroying it's objects and timers on it's own
     */
    destroy() {}

    remove() {
        App.app.ticker.remove(this.update, this);
        this.destroy();
    }
}