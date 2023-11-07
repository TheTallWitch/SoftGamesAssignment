import { HomePage } from "./HomePage";
import { Tools } from "../system/Tools";
import { Scene } from "../system/Scene";
import { CardsPage } from "./CardsPage";
import { TopMenu } from "./TopMenu";
import { TextPage } from "./TextPage";
import { ParticlePage } from "./ParticlePage";

interface Scenes {
    [sceneKey: string]: typeof Scene;
}

/**
 * We require all the assets from the sprites folder with NodeRequire
 */
const spriteContext = require.context('./../../../sprites/', true, /\.(mp3|png|json|jpe?g)$/);

/**
 * This config contains information for different parts of the project
 */
export const Config = {
    background: 0x070707,
    loader: Tools.massiveRequire(spriteContext),
    overlays: {
        "TopMenu": TopMenu,
    } as Scenes,
    pages: {
        "HomePage": HomePage,
        "CardsPage": CardsPage,
        "TextPage": TextPage,
        "ParticlePage": ParticlePage
    } as Scenes,
    cards: {
        count: 144,
        offset: 1,
        animation: {
            delay: 1,
            duration: 2
        }
    },
    texts: {
        interval: 2000
    }
};

export type Config = typeof Config;