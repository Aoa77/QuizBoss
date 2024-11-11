import anime, { AnimeParams } from "animejs";
import { AnimeContext } from "./AnimeContext";
import { AnimeRef } from "./AnimeRef";
import { AnimeTask } from "./AnimeTask";

///
const TransformRegex = {
    scale: /scale\((\d+(\.\d+)?)\)/,
};

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
                if (!el?.style) {
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
                if (!el?.style) {
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
                if (!el?.style) {
                    return;
                }
                if (!el.style?.transform) {
                    el.style.transform = `scale(${value})`;
                    return;
                }
                el.style.transform = el.style?.transform.replace(
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
                if (!el?.style) {
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
