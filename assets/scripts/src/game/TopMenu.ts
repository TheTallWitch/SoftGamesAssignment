import { Text } from "pixi.js";
import { App } from "../system/App";
import { Scene } from "../system/Scene";
import { Tools } from "../system/Tools";
import { Button } from "./Button";

/**
 * Top menu that contains buttons and FPS
 */
export class TopMenu extends Scene {
    private fpsText!: Text;

    create() {
        this.createButtons();
        this.showFPS();
    }
    
    createButtons() {
        const cardsButton = new Button().create('CARDS', window.innerWidth * 0.25, 120, () => {
            App.showCards();
        });
        const textButton = new Button().create('TEXT', window.innerWidth * 0.5, 120, () => {
            App.showTextPage();
        });
        const particlesButton = new Button().create('FIRE', window.innerWidth * 0.75, 120, () => {
            App.showParticlePage();
        });

        this.container.addChild(cardsButton);
        this.container.addChild(textButton);
        this.container.addChild(particlesButton);
    }

    showFPS() {
        this.fpsText = new Text('', {
            fontFamily: 'Arial',
            fontSize: 14 * App.app.renderer.resolution,
            fill: 0xffffff,
            align: 'center',
        });
        this.fpsText.x = 10;
        this.fpsText.y = 50;
        this.fpsText.anchor.set(0, 0.5);

        this.container.addChild(this.fpsText);

        App.app.ticker.add(this.updateFPS, this);
    }

    updateFPS(_delta: number) {
        this.fpsText.text = "FPS: " + Math.round(App.app.ticker.FPS * 1000) / 1000;
    }

    destroy(): void {
        App.app.ticker.remove(this.updateFPS, this);
        Tools.destroyContainerWithChildren(this.container);
    }
}