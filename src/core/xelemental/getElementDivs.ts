import { ElementFactory } from "../xelemental/ElementFactory";
import { Xelement } from "./Xelement";

export function getElementDivs(...keys: string[]): Xelement<HTMLDivElement>[] {
    if (keys.length === 0) {
        return ElementFactory.instance.divArray;
    }
    const map = ElementFactory.instance.divMap;
    const array: Xelement<HTMLDivElement>[] = [];
    keys.forEach((key) => {
        const xref = map.get(key);
        if (!xref) {
            throw new Error(`Xref key not found: ${key}`);
        }
        array.push(xref);
    });
    return array;
}
