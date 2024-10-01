import { ElementFactory } from "../xelemental/ElementFactory";
import { Xelement } from "./Xelement";

export function getElementHeadings(...keys: string[]): Xelement<HTMLHeadingElement>[] {
    if (keys.length === 0) {
        return ElementFactory.instance.headingArray;
    }
    const map = ElementFactory.instance.headingMap;
    const array: Xelement<HTMLHeadingElement>[] = [];
    keys.forEach((key) => {
        const xref = map.get(key);
        if (!xref) {
            throw new Error(`Xref key not found: ${key}`);
        }
        array.push(xref);
    });
    return array;
}
