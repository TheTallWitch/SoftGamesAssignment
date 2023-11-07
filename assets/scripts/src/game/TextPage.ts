import { Text } from "pixi.js";
import { Scene } from "../system/Scene";
import { Tools } from "../system/Tools";
import { Config } from "./Config";
import { App } from "../system/App";

/**
 * I have used a module to get random emojis
 */
const randomEmojiGenerator = require('random-unicode-emoji');

/**
 * Text page that extends Scene
 */
export class TextPage extends Scene {
    private textDisplay!: Text;

    private textInterval!: NodeJS.Timeout;

    create(): void {
        this.createRandomTextCombination();
    }

    generateText(): string {
        const textArray: string[] = [];
        const randomText = Tools.randomText(Math.floor(Math.random() * 8) + 4);
        textArray.push(randomText);

        if (Math.random() < 0.5) {
            const randomEmoji = randomEmojiGenerator.random({
                count: 1
            });
            textArray.push(randomEmoji);
        }
        else {
            const randomChar = Tools.randomSpecialChar();
            textArray.push(randomChar);
        }

        Tools.shuffle(textArray);
        return textArray.join(' ');
    }

    createRandomTextCombination(): void {
        this.textDisplay = new Text(this.generateText(), {
            fontFamily: 'Arial',
            fontSize: (Math.floor(Math.random() * 50) + 12) * App.app.renderer.resolution,
            fill: 0xffffff,
            align: 'center',
        });
        this.textDisplay.anchor.set(0.5, 0.5);
        this.textDisplay.x = window.innerWidth * 0.5;
        this.textDisplay.y = window.innerHeight * 0.5;

        this.container.addChild(this.textDisplay);

        this.textInterval = setInterval(this.updateText.bind(this), Config.texts.interval);
    }

    updateText() {
        this.textDisplay.text = this.generateText();
        this.textDisplay.style.fontSize = (Math.floor(Math.random() * 50) + 12) * App.app.renderer.resolution;
    };

    destroy(): void {
        clearInterval(this.textInterval);
        Tools.destroyContainerWithChildren(this.container);
    }
}