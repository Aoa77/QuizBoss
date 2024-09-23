import { Xref } from "./xref";
import { collections } from "./collections";

export function useXrefDivs(...keys: string[]): Xref<HTMLDivElement>[] {
    const collection = collections.divs;
    const type: string = HTMLDivElement.name;
    keys.forEach((key) => {
        if (collection.has(key)) {
            return;
        }
        collection.set(key, new Xref(type, key));
    });
    return getXrefDivs(...keys);
}

export function getXrefDivs(...keys: string[]): Xref<HTMLDivElement>[] {
    const collection = collections.divs;
    if (keys.length === 0) {
        return Array.from(collection.values());
    }
    const array: Xref<HTMLDivElement>[] = [];
    keys.forEach((key) => {
        const xref = collection.get(key);
        if (!xref) {
            throw new Error(`Xref key not found: ${key}`);
        }
        array.push(xref);
    });
    return array;
}
