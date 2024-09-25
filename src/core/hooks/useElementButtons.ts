import { getElementButtons } from "../functions/getElementButtons";
import { ElementFactory } from "../xobjs/ElementFactory";
import { Xelement } from "../xobjs/Xelement";

export function useElementsButtons(...keys: string[]): Xelement<HTMLButtonElement>[] {
    const map = ElementFactory.instance.buttonMap;
    const type: string = HTMLButtonElement.name;
    keys.forEach((key) => {
        if (map.has(key)) {
            return;
        }
        map.set(key, new Xelement(type, key));
    });
    return getElementButtons(...keys);
}


