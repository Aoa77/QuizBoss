import { ElementFactory } from "./ElementFactory";
import { getElementHeadings } from "./getElementHeadings";
import { Xelement } from "./Xelement";

export function createElementHeadings(...keys: string[]): Xelement<HTMLHeadingElement>[] {
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
