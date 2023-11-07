import { Sprite, Container, Graphics } from "pixi.js";
import { App } from "../system/App";
import { Scene } from "../system/Scene";
import { Config } from "../game/Config";
import { gsap } from "gsap";
import { Tools } from "../system/Tools";

/**
 * Cards page that extends Scene
 */
export class CardsPage extends Scene {
    private cards!: Sprite[];
    private tweens!: gsap.core.Tween[];
    private firstStack!: Container;
    private bottomStackY: number = 0;

    create() {
        this.cards = Array(Config.cards.count);
        this.tweens = Array(Config.cards.count);
        this.createCards();
    }
    
    createCards() {
        this.firstStack = new Container();
        for (let i = 0; i < Config.cards.count; i++) {
            const card = App.sprite("red");
            card.scale.set(App.app.renderer.resolution, App.app.renderer.resolution);
            card.x += i * 3;
            this.cards[i] = card;
            this.firstStack.addChild(card);
        }
        const stackWidth = (3 * (this.cards.length - 1)) + this.cards[0].width;
        const stackX = (window.innerWidth / 2) - (stackWidth / 2);
        const topStackY = (window.innerHeight / 2) - (this.cards[0].height / 2) - 10;
        this.bottomStackY = (window.innerHeight / 2) + (this.cards[0].height / 2) + 10;
        
        this.firstStack.x = stackX;
        this.firstStack.y = topStackY;

        let firstStackBorder = new Graphics();
        firstStackBorder.lineStyle(1 * App.app.renderer.resolution, 0x8e8e8e);
        firstStackBorder.drawRoundedRect(stackX - 5, topStackY - 5, stackWidth + 10, this.cards[0].height + 10, 3);
        this.container.addChild(firstStackBorder);

        let secondStackBorder = new Graphics();
        secondStackBorder.lineStyle(1 * App.app.renderer.resolution, 0x8e8e8e);
        secondStackBorder.drawRoundedRect(stackX - 5, this.bottomStackY - 5, stackWidth + 10, this.cards[0].height + 10, 3);
        this.container.addChild(secondStackBorder);

        this.container.addChild(this.firstStack);

        this.moveCards();
    }

    moveCards() {
        for (let i = this.cards.length - 1; i >= 0; i--) {
            this.tweens[this.cards.length - i - 1] = gsap.to(this.cards[i], {
                duration: Config.cards.animation.duration,
                delay: Config.cards.animation.delay * (this.cards.length - i - 1),
                ease: "power2.in",
                pixi: {
                    x: this.cards[this.cards.length - i - 1].x,
                    y: this.bottomStackY - this.firstStack.y,
                },
                onStart: () => {
                    this.cards[i].zIndex = this.cards.length - i - 1;
                },
                onComplete: () => {
                    this.firstStack.sortChildren();
                }
            });
        }
    }

    destroy() {
        Tools.destroyContainerWithChildren(this.container);
        for (let i = 0; i < this.tweens.length; i++) {
            this.tweens[i].kill();
        }
    }
}