export abstract class Xref {
    public readonly id: string;
    public readonly idSelector: string;

    constructor(id: string) {
        this.id = id;
        this.idSelector = `#${id}`;
    }

    public static check<T>(xref: T | null) {
        if (xref == null) {
            throw new Error("Xref has not been initialized.");
        }
        return xref;
    }
}
