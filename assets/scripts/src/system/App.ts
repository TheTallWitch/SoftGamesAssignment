import * as PIXI from "pixi.js";
import { Loader } from "./Loader";
import { gsap } from "gsap";
import { PixiPlugin } from "gsap/PixiPlugin";
import { ScenesManager } from "./ScenesManager";
import { Config } from "../game/Config";

/**
 * This application class initializes Pixi and gsap that is used throughout the project
 * It holds a reference to the Pixi.Application
 */
class Application {
    private _config!: Config;
    public get config(): Config {
        return this._config;
    }

    private _app!: PIXI.Application;
    public get app(): PIXI.Application {
        return this._app;
    }
    private scenes!: ScenesManager;
    private loader!: Loader;

    /**
     * This is the initial point the starts the application by the given config
     * @param config - Config object
     */
    run(config: Config) {
        gsap.registerPlugin(PixiPlugin);
        PixiPlugin.registerPIXI(PIXI);

        this._config = config;

        this._app = new PIXI.Application({
            resizeTo: window,
            background: this._config.background,
            autoDensity: true,
            resolution: window.devicePixelRatio,
        });
        document.body.appendChild(this._app.view as HTMLCanvasElement);

        this.scenes = new ScenesManager();
        this._app.stage.eventMode = 'passive';
        this._app.stage.addChild(this.scenes.container);

        this.loader = new Loader(PIXI.Assets, this._config);
        this.loader.preload().then((textures) => {
            this.loader.resources = textures;
            this.start()
        });
    }

    /**
     * This is a simple method that fetches texture from previously loaded sprites
     * @param key - resource key
     */
    res(key: string) {
        return this.loader.resources[key];
    }

    /**
     * This is a simple method that returns Pixi Sprite with a given key
     * @param key - resource key
     */
    sprite(key: string) {
        return new PIXI.Sprite(this.res(key));
    }

    start() {
        this.scenes.start("HomePage");
        this.scenes.start("TopMenu");
    }

    showCards() {
        this.scenes.start("CardsPage");
    }

    showTextPage() {
        this.scenes.start("TextPage");
    }

    showParticlePage() {
        this.scenes.start("ParticlePage");
    }
}

export const App = new Application();