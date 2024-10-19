import { Factory } from "./Factory";
import { Xelement } from "./Xelement";
import { xref } from "./xref";

export const createXref = {
    buttons: (...keys: string[]): Xelement<HTMLButtonElement>[] => {
        const map = Factory.instance.buttonMap;
        const type: string = HTMLButtonElement.name;
        keys.forEach((key) => {
            if (map.has(key)) {
                return;
            }
            map.set(key, new Xelement(type, key));
        });
        return xref.buttons(...keys);
    },

    divs: (...keys: string[]): Xelement<HTMLDivElement>[] => {
        const map = Factory.instance.divMap;
        const type: string = HTMLDivElement.name;
        keys.forEach((key) => {
            if (map.has(key)) {
                return;
            }
            map.set(key, new Xelement(type, key));
        });
        return xref.divs(...keys);
    },

    headings: (...keys: string[]): Xelement<HTMLHeadingElement>[] => {
        const map = Factory.instance.headingMap;
        const type: string = HTMLHeadingElement.name;
        keys.forEach((key) => {
            if (map.has(key)) {
                return;
            }
            map.set(key, new Xelement(type, key));
        });
        return xref.headings(...keys);
    },
};
