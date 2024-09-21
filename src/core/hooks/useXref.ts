import Xref from "./Xref";
export { Xref };
const xrefs: Map<string, object> = new Map();

export function useXref<T>(...params: XrefKey[]): Xref<T>[] {
    const xrk = getXrefKeyString(...params);
    return xrk.map((id) => {
        if (!xrefs.has(id)) {
            xrefs.set(id, new Xref(id));
        }
        return xrefs.get(id) as Xref<T>;
    });
}

export function getXref<T>(...params: XrefKey[]): Xref<T>[] {
    const xrk = getXrefKeyString(...params);
    return xrk.map((id) => {
        return xrefs.get(id) as Xref<T>;
    });
}

export interface XrefKey {
    id: string;
    index?: number;
}

function getXrefKeyString(...params: XrefKey[]): string[] {
    return params.map((xrk) => {
        let key: string = xrk.id;
        if (xrk.index) {
            key += "_" + xrk.index;
        }
        return key;
    });
}
