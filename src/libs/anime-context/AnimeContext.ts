import anime, { AnimeParams } from "animejs";
import { AnimeRef } from "./AnimeRef";
import { AnimeTask } from "./AnimeTask";

///
const TransformRegex = {
    scale: /scale\((\d+(\.\d+)?)\)/,
};

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

///
export function useAnimeRef<T extends string>(id: T): AnimeRef {
    return useAnimeRefs(id, 1)[0];
}

///
export function useAnimeRefs<T extends string>(
    baseId: T,
    count: number,
): AnimeRef[] {
    const animRefs: AnimeRef[] = [];
    for (let i = 0; i < count; i++) {
        const id = `${baseId}-${i}`;
        const target = `#${id}`;

        const obj: AnimeRef = {
            id,
            target,
            get element(): HTMLElement | null {
                return document.getElementById(this.id);
            },
            get rect(): DOMRect | null {
                const el = this.element;
                return el?.getBoundingClientRect() ?? null;
            },
            get color(): string | null {
                const el = this.element;
                return el?.style?.color ?? "";
            },
            set color(value: string) {
                const el = this.element;
                if (!el) {
                    return;
                }
                el.style.color = value;
            },
            get opacity(): number | null {
                const el = this.element;
                const value = parseFloat(el?.style?.opacity ?? "-1");
                return value >= 0 ? value : null;
            },
            set opacity(value: number) {
                const el = this.element;
                if (!el) {
                    return;
                }
                el.style.opacity = value.toString();
            },
            get scale(): number | null {
                const el = this.element;
                const transform = el?.style?.transform;
                const scale = transform?.match(TransformRegex.scale);
                if (!scale) {
                    return null;
                }
                const value = parseFloat(scale?.[1] ?? "-1");
                return value >= 0 ? value : null;
            },
            set scale(value: number) {
                const el = this.element;
                if (!el) {
                    return;
                }
                if (!el.style.transform) {
                    el.style.transform = `scale(${value})`;
                    return;
                }
                el.style.transform = el.style.transform.replace(
                    TransformRegex.scale,
                    `scale(${value})`,
                );
            },
            build(params: AnimeParams) {
                return anime({
                    targets: obj.target,
                    ...params,
                });
            },
            clearTransforms() {
                const el = this.element;
                if (!el) {
                    return;
                }
                el.style.transform = "";
            },
            run(params: AnimeParams) {
                return AnimeTask.run(this.build(params));
            },
        };
        AnimeContext.set(baseId, obj, i);
        animRefs.push(obj);
    }
    return animRefs;
}
