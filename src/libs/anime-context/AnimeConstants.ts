export class $time {
    public static get millisecond() {
        return 1;
    }
    public static get second() {
        return 1000;
    }
    public static milliseconds(ms: number) {
        return ms;
    }
    public static seconds(s: number) {
        return s * 1000;
    }
    public static get tick() {
        return this._tick;
    }
    public static ticks(t: number) {
        return t * this._tick;
    }
    private static _tick: number = 500;
    public static setTickTime(tick: number) {
        this._tick = tick;
    }
}

export const $ease = {
    linear: "linear",
    in: {
        elastic: (amplitude: number, period: number) =>
            `easeInElastic(${amplitude}, ${period})`,

        back: "easeInBack",
        bounce: "easeInBounce",
        circ: "easeInCirc",
        cubic: "easeInCubic",
        expo: "easeInExpo",
        quad: "easeInQuad",
        quart: "easeInQuart",
        quint: "easeInQuint",
        sine: "easeInSine",

        out: {
            elastic: (amplitude: number, period: number) =>
                `easeInOutElastic(${amplitude}, ${period})`,

            back: "easeInOutBack",
            bounce: "easeInOutBounce",
            circ: "easeInOutCirc",
            cubic: "easeInOutCubic",
            expo: "easeInOutExpo",
            quad: "easeInOutQuad",
            quart: "easeInOutQuart",
            quint: "easeInOutQuint",
            sine: "easeInOutSine",
        },
    },
    out: {
        elastic: (amplitude: number, period: number) =>
            `easeOutElastic(${amplitude}, ${period})`,

        back: "easeOutBack",
        bounce: "easeOutBounce",
        circ: "easeOutCirc",
        cubic: "easeOutCubic",
        expo: "easeOutExpo",
        quad: "easeOutQuad",
        quart: "easeOutQuart",
        quint: "easeOutQuint",
        sine: "easeOutSine",

        in: {
            elastic: (amplitude: number, period: number) =>
                `easeOutInElastic(${amplitude}, ${period})`,

            back: "easeOutInBack",
            bounce: "easeOutInBounce",
            circ: "easeOutInCirc",
            cubic: "easeOutInCubic",
            expo: "easeOutInExpo",
            quad: "easeOutInQuad",
            quart: "easeOutInQuart",
            quint: "easeOutInQuint",
            sine: "easeOutInSine",
        },
    },
};

