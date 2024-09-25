import { ElementFactory } from "../xobjs/ElementFactory";
import { Xelement } from "../xobjs/Xelement";

export function getElementButtons(...keys: string[]): Xelement<HTMLButtonElement>[] {
    if (keys.length === 0) {
        return ElementFactory.instance.buttonArray;
    }
    const map = ElementFactory.instance.buttonMap;
    const array: Xelement<HTMLButtonElement>[] = [];
    keys.forEach((key) => {
        const xref = map.get(key);
        if (!xref) {
            throw new Error(`Xref key not found: ${key}`);
        }
        array.push(xref);
    });
    return array;
}
