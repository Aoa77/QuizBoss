import { Xref } from "./classes";
import { collections } from "./collections";

export function useXrefButtons(...keys: string[]): Xref<HTMLButtonElement>[] {
    const collection = collections.buttons;
    const type: string = HTMLButtonElement.name;
    keys.forEach((key) => {
        if (collection.has(key)) {
            return;
        }
        collection.set(key, new Xref(type, key));
    });
    return getXrefButtons(...keys);
}

export function getXrefButtons(...keys: string[]): Xref<HTMLButtonElement>[] {
    if (keys.length === 0) {
        throw new Error("No keys provided");
    }
    const collection = collections.buttons;
    if (collection.size === 0) {
        throw new Error("No buttons in collection");
    }
    return keys.map((key) => collection.get(key)!);
}
