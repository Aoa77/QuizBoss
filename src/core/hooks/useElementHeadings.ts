import { getElementHeadings } from "../functions/getElementHeadings";
import { ElementFactory } from "../xobjs/ElementFactory";
import { Xelement } from "../xobjs/Xelement";

export function useElementHeadings(...keys: string[]): Xelement<HTMLHeadingElement>[] {
    const map = ElementFactory.instance.headingMap;
    const type: string = HTMLHeadingElement.name;
    keys.forEach((key) => {
        if (map.has(key)) {
            return;
        }
        map.set(key, new Xelement(type, key));
    });
    return getElementHeadings(...keys);
}
