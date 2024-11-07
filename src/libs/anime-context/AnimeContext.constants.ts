export enum Duration {
    zero = 0,
    oneSecond = 1000,
}

export const Fade = {
    in: [0, 1],
    out: [1, 0],
    one: 1,
    half: 0.5,
    zero: 0,
};

export const Scale = {
    up: [0, 1],
    down: [1, 0],
    one: 1,
    zero: 0,
};

export const Ease = {
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

export const TransformRegex = {
    scale: /scale\((\d+(\.\d+)?)\)/,
};
