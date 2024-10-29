import { AnimeInstance, AnimeParams } from "animejs";
import { RefObject } from "react";

class AnimeRefMap extends Map<string, AnimeRefObject> {}

export class AnimeContext {
    private static readonly _map: AnimeRefMap = new AnimeRefMap();
    private static composeKey<T extends string>(id: T, index: number) {
        let key: string = id;
        if (index > 0) {
            key = `${id}-${index}`;
        }
        return key;
    }

    public static get<T extends string>(
        id: T,
        index: number = 0,
    ): AnimeRefObject | null {
        const key: string = AnimeContext.composeKey<T>(id, index);
        return AnimeContext._map.get(key) ?? null;
    }

    public static set<T extends string>(id: T, ref: AnimeRefObject, index: number) {
        const key: string = AnimeContext.composeKey<T>(id, index);
        AnimeContext._map.set(key, ref);
    }
}

export interface AnimeRefObject {
    id: string;
    ref: RefObject<HTMLElement>;
    target: string;
    get opacity(): number | null;
    set opacity(value: number);
    get scale(): number | null;
    set scale(value: number);
    build(params: AnimeParams): AnimeInstance;
    run(params: AnimeParams): Promise<void>;
}

