import { Container } from "pixi.js";

/**
 * This class contains static methods that are used throughout the project
 */
export class Tools {

    /**
     * A method that creates a list of assets retrieved by NodeRequire
     * @param req - retrieved assets
     */
    static massiveRequire(req: __WebpackModuleApi.RequireContext) {
        const files: { key: string; data: any }[] = [];

        req.keys().forEach((key: string) => {
            files.push({
                key,
                data: req(key),
            });
        });

        return files;
    }

    /**
     * A method that generates a random special character
     */
    static randomSpecialChar = () =>
        "!§$%&?".substr(Math.floor(5 * Math.random()), 1);

    /**
     * A method to generate a random string of alpha-numerals with ny given length
     * @param length - length of the random string
     */
    static randomText(length: number) {
        let result = "";
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }
        return result;
    }

    /**
     * A method to shuffle any given array
     * @param array - array to be shuffled
     */
    static shuffle(array: any[]) {
        let currentIndex = array.length, randomIndex;
        while (currentIndex > 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex],
                array[currentIndex],
            ];
        }

        return array;
    }

    /**
     * A method to recursively destroy all the container's children and then destroy the container itself
     * @param container - container to be destroyed
     */
    static destroyContainerWithChildren(container: Container) {
        for (const child of container.children) {
            if (child instanceof Container) {
                Tools.destroyContainerWithChildren(child);
            } else {
                child.destroy();
            }
        }

        container.destroy();
    }
}
