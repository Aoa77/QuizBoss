import { Xref } from "./classes";
import { collections } from "./collections";

export function useXrefDivs(
    ...keys: string[]
): Xref<HTMLDivElement>[] {
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

export function getXrefDivs(
    ...keys: string[]
): Xref<HTMLDivElement>[] {
    if (keys.length === 0) {
        throw new Error("No keys provided");
    }
    const collection = collections.divs;
    if (collection.size === 0) {
        throw new Error("No divs in collection");
    }
    return keys.map((key) => collection.get(key)!);
}
