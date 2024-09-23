import { Xref } from "./classes";
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
    if (keys.length === 0) {
        throw new Error("No keys provided");
    }
    const collection = collections.headings;
    if (collection.size === 0) {
        throw new Error("No headings in collection");
    }
    return keys.map((key) => collection.get(key)!);
}
