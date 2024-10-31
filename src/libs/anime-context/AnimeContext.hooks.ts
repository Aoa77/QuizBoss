import anime, { AnimeParams } from "animejs";
import { AnimeContext } from "./AnimeContext";
import { AnimeRef } from "./AnimeRef";
import { TransformRegex } from "./AnimeContext.constants";
import { AnimeTask } from "./AnimeTask";

export function useAnimeRef<T extends string>(id: T): AnimeRef {
    return useAnimeRefs(id, 1)[0];
}

export function useAnimeRefs<T extends string>(baseId: T, count: number): AnimeRef[] {
    const animRefs: AnimeRef[] = [];
    for (let i = 0; i < count; i++) {
        const id = `${baseId}-${i}`;
        const target = `#${id}`;

        const obj: AnimeRef = {
            id,
            target,
            get rect(): DOMRect | null {
                const el = document.getElementById(this.id);
                return el?.getBoundingClientRect() ?? null;
            },
            get opacity(): number | null {
                const el = document.getElementById(this.id);
                const value = parseFloat(el?.style?.opacity ?? "-1");
                return value >= 0 ? value : null;
            },
            set opacity(value: number) {
                const el = document.getElementById(this.id);
                if (!el) {
                    return;
                }
                el.style.opacity = value.toString();
            },
            get scale(): number | null {
                const el = document.getElementById(this.id);
                const transform = el?.style?.transform;
                const scale = transform?.match(TransformRegex.scale);
                if (!scale) {
                    return null;
                }
                const value = parseFloat(scale?.[1] ?? "-1");
                return value >= 0 ? value : null;
            },
            set scale(value: number) {
                const el = document.getElementById(this.id);
                if (!el) {
                    return;
                }
                el.style.transform = el.style.transform.replace(
                    TransformRegex.scale,
                    `scale(${value})`,
                );
            },
            build(params: AnimeParams) {
                console.debug("1", target);
                return anime({
                    targets: obj.target,
                    ...params,
                });
            },
            clearTransforms() {
                const el = document.getElementById(this.id);
                if (!el) {
                    return;
                }
                el.style.transform = "";
            },
            run(params: AnimeParams) {
                return AnimeTask.run(this.build(params));
            },
            targetWith(companions: AnimeRef[]) {
                const targets = companions.map((c) => c.target).join(", ");
                obj.target += ", " + targets;
                console.debug("@", obj.target);
                return obj;
            },
        };
        AnimeContext.set(baseId, obj, i);
        animRefs.push(obj);
    }
    return animRefs;
}
