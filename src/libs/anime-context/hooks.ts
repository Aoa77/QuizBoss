import { useMemo } from "react";
import { AnimeContext } from "./AnimeContext";
import { AnimeRef } from "./AnimeRef";

///
export function useAnimeRef<T extends string>(id: T): AnimeRef {
    return useAnimeRefs(id, 1)[0];
}

///
export function useAnimeRefs<T extends string>(
    baseId: T,
    count: number,
): AnimeRef[] {
    return useMemo(() => {
        console.debug("useAnimeRefs", { baseId, count });
        const animRefs: AnimeRef[] = [];
        for (let i = 0; i < count; i++) {
            const obj = new AnimeRef(`${baseId}-${i}`);
            AnimeContext.set(baseId, obj, i);
            animRefs.push(obj);
        }
        return animRefs;
    }, [baseId, count]);
}
