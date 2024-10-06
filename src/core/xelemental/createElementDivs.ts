import { ElementFactory } from "./ElementFactory";
import { getElementDivs } from "./getElementDivs";
import { Xelement } from "./Xelement";

export function createElementDivs(...keys: string[]): Xelement<HTMLDivElement>[] {
    const map = ElementFactory.instance.divMap;
    const type: string = HTMLDivElement.name;
    keys.forEach((key) => {
        if (map.has(key)) {
            return;
        }
        map.set(key, new Xelement(type, key));
    });
    return getElementDivs(...keys);
}
