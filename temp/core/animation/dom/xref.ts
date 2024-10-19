import { AnimeParams } from "animejs";
import { runAnimation } from "../runners";
import { Factory } from "./Factory";
import { Xelement } from "./Xelement";
import { FadeParams, ScaleParams, SlideParams } from "../params";
import { fadeImmediately, fadeIn, fadeOut, fadeTo } from "../fade";
import { scaleImmediately, scaleTo } from "../scale";
import { slideReset, slideTo } from "../slide";

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

    public async fadeImmediately(opacity: number): Promise<void> {
        await this.runAnimation(fadeImmediately(opacity));
    }

    public async fadeIn(p: FadeParams): Promise<void> {
        await this.runAnimation(fadeIn(p));
    }

    public async fadeOut(p: FadeParams): Promise<void> {
        await this.runAnimation(fadeOut(p));
    }

    public async fadeTo(p: FadeParams): Promise<void> {
        await this.runAnimation(fadeTo(p));
    }

    public async scaleTo(p: ScaleParams): Promise<void> {
        await this.runAnimation(scaleTo(p));
    }

    public async scaleImmediately(scale: number): Promise<void> {
        await this.runAnimation(scaleImmediately(scale));
    }

    public async slideTo(p: SlideParams): Promise<void> {
        await this.runAnimation(slideTo(p));
    }

    public async slideReset(): Promise<void> {
        await this.runAnimation(slideReset());
    }
}
