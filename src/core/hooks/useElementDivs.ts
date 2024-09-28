import { getElementDivs } from "../functions/getElementDivs";
import { ElementFactory } from "../xobjs/ElementFactory";
import { Xelement } from "../xobjs/Xelement";

export function useElementDivs(...keys: string[]): Xelement<HTMLDivElement>[] {
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
