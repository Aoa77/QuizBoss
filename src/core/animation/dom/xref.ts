import { AnimeParams } from "animejs";
import { runAnimation } from "../runners";
import { Factory } from "./Factory";
import { Xelement } from "./Xelement";

export const xref = {
    buttons: (...keys: string[]): Xelement<HTMLButtonElement>[] => {
        if (keys.length === 0) {
            return Factory.instance.buttonArray;
        }
        const map = Factory.instance.buttonMap;
        const array: Xelement<HTMLButtonElement>[] = [];
        keys.forEach((key) => {
            const xref = map.get(key);
            if (!xref) {
                throw new Error(`Xref key not found: ${key}`);
            }
            array.push(xref);
        });
        return array;
    },

    divs: (...keys: string[]): Xelement<HTMLDivElement>[] => {
        if (keys.length === 0) {
            return Factory.instance.divArray;
        }
        const map = Factory.instance.divMap;
        const array: Xelement<HTMLDivElement>[] = [];
        keys.forEach((key) => {
            const xref = map.get(key);
            if (!xref) {
                throw new Error(`Xref key not found: ${key}`);
            }
            array.push(xref);
        });
        return array;
    },

    headings: (...keys: string[]): Xelement<HTMLHeadingElement>[] => {
        if (keys.length === 0) {
            return Factory.instance.headingArray;
        }
        const map = Factory.instance.headingMap;
        const array: Xelement<HTMLHeadingElement>[] = [];
        keys.forEach((key) => {
            const xref = map.get(key);
            if (!xref) {
                throw new Error(`Xref key not found: ${key}`);
            }
            array.push(xref);
        });
        return array;
    },
};

export abstract class Xref {
    public readonly type: string;
    public readonly id: string;
    public readonly idSelector: string;

    constructor(type: string, id: string) {
        this.type = type;
        this.id = id;
        this.idSelector = `#${id}`;
    }

    public async runAnimation(xp: AnimeParams): Promise<void> {
        xp.targets = this.idSelector;
        await runAnimation(xp);
    }
}
