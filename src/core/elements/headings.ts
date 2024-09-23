import { Xref } from "./xref";
import { collections } from "./collections";

export function useXrefHeadings(...keys: string[]): Xref<HTMLHeadingElement>[] {
    const collection = collections.headings;
    const type: string = HTMLHeadingElement.name;
    keys.forEach((key) => {
        if (collection.has(key)) {
            return;
        }
        collection.set(key, new Xref(type, key));
    });
    return getXrefHeadings(...keys);
}

export function getXrefHeadings(...keys: string[]): Xref<HTMLHeadingElement>[] {
    const collection = collections.headings;
    if (keys.length === 0) {
        return Array.from(collection.values());
    }
    const array: Xref<HTMLHeadingElement>[] = [];
    keys.forEach((key) => {
        const xref = collection.get(key);
        if (!xref) {
            throw new Error(`Xref key not found: ${key}`);
        }
        array.push(xref);
    });
    return array;
}
