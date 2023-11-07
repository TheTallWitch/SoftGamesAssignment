import { Container, Text } from "pixi.js";
import { App } from "../system/App";

/**
 * Custom button class with texture
 */

export class Button {

    /**
     * @param text - Button text
     * @param x - Button position x with center anchor point
     * @param y - Button position y with center anchor point
     * @param callback - Button callback on click
     */
    create(text: string, x: number, y: number, callback: () => void) {
        const buttonBack = App.sprite("button");
        buttonBack.scale.set(0.8, 0.8);
        const buttonText = new Text(text, {
            fontFamily: 'Arial',
            fontSize: 20 * App.app.renderer.resolution,
            fill: 0xffffff,
            align: 'center',
        });
        buttonText.anchor.set(0.5, 0.5);
        buttonText.x = buttonBack.width / 2;
        buttonText.y = buttonBack.height / 2;

        const button = new Container();
        button.addChild(buttonBack);
        button.addChild(buttonText);
        button.x = x - (button.width / 2);
        button.y = y - (button.height / 2);

        button.eventMode = "static";
        button.on("pointerdown", () => {
            callback();
        }, this);

        return button;
    }
}