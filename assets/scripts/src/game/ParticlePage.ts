import { Container, Graphics, Text } from "pixi.js";
import { Scene } from "../system/Scene";
import { Tools } from "../system/Tools";
import { App } from "../system/App";

/**
 * I have used the DOOM fire algorithm from https://github.com/filipedeschamps/doom-fire-algorithm
 * which was adapted for PixiJs: https://github.com/filipedeschamps/doom-fire-algorithm
 * I then converted it to TypeScript and used it in my project
 */

export class ParticlePage extends Scene {
    private firePixelsArray!: number[];
    static readonly pixelSize = 4;
    static readonly fireWidth = Math.round(window.innerWidth / ParticlePage.pixelSize);
    static readonly fireHeight = 80;
    private fireColorsPalette = [{ "r": 7, "g": 7, "b": 7 }, { "r": 31, "g": 7, "b": 7 }, { "r": 47, "g": 15, "b": 7 }, { "r": 71, "g": 15, "b": 7 }, { "r": 87, "g": 23, "b": 7 }, { "r": 103, "g": 31, "b": 7 }, { "r": 119, "g": 31, "b": 7 }, { "r": 143, "g": 39, "b": 7 }, { "r": 159, "g": 47, "b": 7 }, { "r": 175, "g": 63, "b": 7 }, { "r": 191, "g": 71, "b": 7 }, { "r": 199, "g": 71, "b": 7 }, { "r": 223, "g": 79, "b": 7 }, { "r": 223, "g": 87, "b": 7 }, { "r": 223, "g": 87, "b": 7 }, { "r": 215, "g": 95, "b": 7 }, { "r": 215, "g": 95, "b": 7 }, { "r": 215, "g": 103, "b": 15 }, { "r": 207, "g": 111, "b": 15 }, { "r": 207, "g": 119, "b": 15 }, { "r": 207, "g": 127, "b": 15 }, { "r": 207, "g": 135, "b": 23 }, { "r": 199, "g": 135, "b": 23 }, { "r": 199, "g": 143, "b": 23 }, { "r": 199, "g": 151, "b": 31 }, { "r": 191, "g": 159, "b": 31 }, { "r": 191, "g": 159, "b": 31 }, { "r": 191, "g": 167, "b": 39 }, { "r": 191, "g": 167, "b": 39 }, { "r": 191, "g": 175, "b": 47 }, { "r": 183, "g": 175, "b": 47 }, { "r": 183, "g": 183, "b": 47 }, { "r": 183, "g": 183, "b": 55 }, { "r": 207, "g": 207, "b": 111 }, { "r": 223, "g": 223, "b": 159 }, { "r": 239, "g": 239, "b": 199 }, { "r": 255, "g": 255, "b": 255 }];

    private from10To16 = (n: number) => n.toString(16).padStart(2, '0');

    private graphics!: Graphics;
    
    private fireInterval!: NodeJS.Timeout;

    create() {
        const text = new Text('This is a tribute to', {
            fontFamily: 'Arial',
            fontSize: 32 * App.app.renderer.resolution,
            fill: 0xffffff,
            align: 'center',
        });

        const logo = App.sprite("doom");
        logo.anchor.set(0.5, 0);
        logo.scale.set(App.app.renderer.resolution, App.app.renderer.resolution);
        logo.x = text.width / 2;
        logo.y = text.y + text.height + 10;

        const middleContainer = new Container();
        middleContainer.addChild(text);
        middleContainer.addChild(logo);

        middleContainer.x = (window.innerWidth / 2) - (middleContainer.width / 2);
        middleContainer.y = (window.innerHeight / 2) - (middleContainer.height / 2);

        this.container.addChild(middleContainer);

        this.graphics = new Graphics();
        this.graphics.beginFill(0x000000, 0);
        this.graphics.x = 0;
        this.graphics.y = window.innerHeight - (ParticlePage.fireHeight * ParticlePage.pixelSize);
        this.container.addChild(this.graphics);
        this.start();
    }

    /**
     * Starting the process to create the fire animation
     * This method starts an interval which calculates the intensity of the fire pixels every 50 milliseconds
     */
    start() {
        this.createFireDataStructure();
        this.createFireSource();

        this.fireInterval = setInterval(this.calculateFirePropagation.bind(this), 50);
    }

    /**
     * This method creates the structure of the animation by creating a table-like array that holds the intensity for each pixel
     */
    createFireDataStructure() {
        const numberOfPixels = ParticlePage.fireWidth * ParticlePage.fireHeight;
        this.firePixelsArray = Array(numberOfPixels);

        for (let i = 0; i < numberOfPixels; i++) {
            this.firePixelsArray[i] = 0;
        }
    }

    /**
     * This method calculates fire intensity for the pixels
     */
    calculateFirePropagation() {
        for (let column = 0; column < ParticlePage.fireWidth; column++) {
            for (let row = 0; row < ParticlePage.fireHeight; row++) {
                const pixelIndex = column + (ParticlePage.fireWidth * row);
                this.updateFireIntensityPerPixel(pixelIndex);
            }
        }

        this.renderFire()
    }

    /**
     * This method calculates the fire intensity for each pixel by giving a randomness to the intensity to create a wind effect
     * @param currentPixelIndex - the index of the cell/pixel to be calculated
     */
    updateFireIntensityPerPixel(currentPixelIndex: number) {
        const belowPixelIndex = currentPixelIndex + ParticlePage.fireWidth;

        if (belowPixelIndex >= ParticlePage.fireWidth * ParticlePage.fireHeight) {
            return;
        }

        const decay = Math.floor(Math.random() * 2)
        const belowPixelFireIntensity = this.firePixelsArray[belowPixelIndex];
        const newFireIntensity =
            belowPixelFireIntensity - decay >= 0 ? belowPixelFireIntensity - decay : 0;

        this.firePixelsArray[currentPixelIndex - decay] = newFireIntensity;
    }

    /**
     * This method fills each pixel with colors according to the fire intensity calculated with the help of graphics
     */
    renderFire() {
        this.graphics.clear()

        for (let row = 0; row < ParticlePage.fireHeight; row++) {
            for (let column = 0; column < ParticlePage.fireWidth; column++) {
                const pixelIndex = column + (ParticlePage.fireWidth * row);
                const fireIntensity = this.firePixelsArray[pixelIndex];
                const color = this.fireColorsPalette[fireIntensity];
                const colorString = `${this.from10To16(color.r)}${this.from10To16(color.g)}${this.from10To16(color.b)}`;
                this.graphics.beginFill(parseInt(colorString, 16));
                this.graphics.drawRect(column * ParticlePage.pixelSize, row * ParticlePage.pixelSize, ParticlePage.pixelSize, ParticlePage.pixelSize);
                this.graphics.endFill();
            }
        }
    }

    /**
     * This method creates the fire table and fills each cell with a max intensity
     */
    createFireSource() {
        for (let column = 0; column <= ParticlePage.fireWidth; column++) {
            const overflowPixelIndex = ParticlePage.fireWidth * ParticlePage.fireHeight;
            const pixelIndex = (overflowPixelIndex - ParticlePage.fireWidth) + column;

            this.firePixelsArray[pixelIndex] = 36;
        }
    }

    /**
     * This method destroys all the cells by setting the intensity to 0
     */
    destroyFireSource() {
        for (let column = 0; column <= ParticlePage.fireWidth; column++) {
            const overflowPixelIndex = ParticlePage.fireWidth * ParticlePage.fireHeight;
            const pixelIndex = (overflowPixelIndex - ParticlePage.fireWidth) + column;

            this.firePixelsArray[pixelIndex] = 0;
        }
    }

    destroy() {
        clearInterval(this.fireInterval);
        this.destroyFireSource();
        Tools.destroyContainerWithChildren(this.container);
    }
}