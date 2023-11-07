import * as PIXI from "pixi.js";
import { Config } from "../game/Config";

/**
 * This is a helper class for preloading all media available in the sprites folder
 */
export class Loader {
    private loader: PIXI.AssetsClass;
    private config: Config;
    private keys: string[];
    private _resources: Record<string, any>;
    public get resources(): Record<string, any> {
        return this._resources;
    }
    public set resources(value: Record<string, any>) {
        this._resources = value;
    }

    constructor(loader: PIXI.AssetsClass, config: Config) {
        this.loader = loader;
        this.config = config;
        this.keys = [];
        this._resources = [];
    }

    preload() {
        for (const asset of this.config.loader) {
            let key = asset.key.substr(asset.key.lastIndexOf('/') + 1);
            key = key.substring(0, key.indexOf('.'));
            this.keys.push(key);
            if (asset.key.indexOf(".png") !== -1 || asset.key.indexOf(".jpg") !== -1) {
                this.loader.add({alias: key, src: asset.data.default})
            }
        }

        return this.loader.load(this.keys);
    }
}