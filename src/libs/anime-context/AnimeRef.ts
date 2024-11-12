import anime from "animejs";
import { AnimeParams } from "animejs";
import { AnimeTask } from "./AnimeTask";

///
const TransformRegex = {
    scale: /scale\((\d+(\.\d+)?)\)/,
};

export class AnimeRef {
    public readonly id: string;
    public readonly target: string;

    public constructor(id: string) {
        this.id = id;
        this.target = `#${id}`;
    }
    public get element(): HTMLElement | null {
        return document.getElementById(this.id);
    }

    public get rect(): DOMRect | null {
        const el = this.element;
        return el?.getBoundingClientRect() ?? null;
    }

    public get color(): string | null {
        const el = this.element;
        return el?.style?.color ?? "";
    }

    private set color(value: string) {
        const el = this.element;
        if (!el?.style) {
            return;
        }
        el.style.color = value;
    }

    public get opacity(): number | null {
        const el = this.element;
        const value = parseFloat(el?.style?.opacity ?? "-1");
        return value >= 0 ? value : null;
    }

    private set opacity(value: number) {
        const el = this.element;
        if (!el?.style) {
            return;
        }
        el.style.opacity = value.toString();
    }

    public get scale(): number | null {
        const el = this.element;
        const transform = el?.style?.transform;
        const scale = transform?.match(TransformRegex.scale);
        if (!scale) {
            return null;
        }
        const value = parseFloat(scale?.[1] ?? "-1");
        return value >= 0 ? value : null;
    }

    private set scale(value: number) {
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
    }

    public build(params: AnimeParams) {
        return anime({
            targets: this.target,
            ...params,
        });
    }

    public clearTransforms() {
        const el = this.element;
        if (!el?.style) {
            return;
        }
        el.style.transform = "";
    }

    public run(params: AnimeParams) {
        return AnimeTask.run(this.build(params));
    }

    public update(params: {
        color?: string;
        opacity?: number;
        scale?: number;
    }) {
        const { color, opacity, scale } = params;
        if (color) {
            this.color = color;
        }
        if (opacity || opacity === 0) {
            this.opacity = opacity;
        }
        if (scale || scale === 0) {
            this.scale = scale;
        }
    }
}
