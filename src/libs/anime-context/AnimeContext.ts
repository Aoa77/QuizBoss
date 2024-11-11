import { AnimeRef } from "./AnimeRef";

///
class AnimeRefMap extends Map<string, AnimeRef> {}

///
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
    ): AnimeRef | null {
        const key: string = AnimeContext.composeKey<T>(id, index);
        return AnimeContext._map.get(key) ?? null;
    }

    public static set<T extends string>(id: T, ref: AnimeRef, index: number) {
        const key: string = AnimeContext.composeKey<T>(id, index);
        AnimeContext._map.set(key, ref);
    }
}
