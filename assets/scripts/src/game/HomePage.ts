import { Text } from "pixi.js";
import { Scene } from "../system/Scene";
import { Tools } from "../system/Tools";
import { App } from "../system/App";

/**
 * Home page that extends Scene
 */
export class HomePage extends Scene {
    create() {
        const text = new Text('WELCOME!', {
            fontFamily: 'Arial',
            fontSize: 50 * App.app.renderer.resolution,
            fill: 0xffffff,
            align: 'center',
        });
        text.anchor.set(0.5, 0.5);
        text.x = window.innerWidth / 2;
        text.y = window.innerHeight / 2;

        this.container.addChild(text);
    }

    destroy() {
        Tools.destroyContainerWithChildren(this.container);
    }
}