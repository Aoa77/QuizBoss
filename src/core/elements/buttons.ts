import { Xref } from "./xref";
import { collections } from "./collections";

let buttonArray:Xref<HTMLButtonElement>[] = [];

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
    const collection = collections.buttons;
    if (keys.length === 0) {
        if (buttonArray.length === 0) {
            buttonArray = Array.from(collection.values());
        }
        return buttonArray;
    }
    const array: Xref<HTMLButtonElement>[] = [];
    keys.forEach((key) => {
        const xref = collection.get(key);
        if (!xref) {
            throw new Error(`Xref key not found: ${key}`);
        }
        array.push(xref);
    });
    return array;
}
