export enum Duration {
    zero = 0,
    oneSecond = 1000,
}

export enum Fade {
    max = 1,
    min = 0,
}

export enum Scale {
    one = 1,
    zero = 0,
}

export enum Ease {
    linear = "linear",

    inBack = "easeInBack",
    inBounce = "easeInBounce",
    inCirc = "easeInCirc",
    inCubic = "easeInCubic",
    inExpo = "easeInExpo",
    inQuad = "easeInQuad",
    inQuart = "easeInQuart",
    inQuint = "easeInQuint",
    inSine = "easeInSine",

    outBack = "easeOutBack",
    outBounce = "easeOutBounce",
    outCirc = "easeOutCirc",
    outCubic = "easeOutCubic",
    outExpo = "easeOutExpo",
    outQuad = "easeOutQuad",
    outQuart = "easeOutQuart",
    outQuint = "easeOutQuint",
    outSine = "easeOutSine",

    inOutBack = "easeInOutBack",
    inOutBounce = "easeInOutBounce",
    inOutCirc = "easeInOutCirc",
    inOutCubic = "easeInOutCubic",
    inOutExpo = "easeInOutExpo",
    inOutQuad = "easeInOutQuad",
    inOutQuart = "easeInOutQuart",
    inOutQuint = "easeInOutQuint",
    inOutSine = "easeInOutSine",

    outInBack = "easeOutInBack",
    outInBounce = "easeOutInBounce",
    outInCirc = "easeOutInCirc",
    outInCubic = "easeOutInCubic",
    outInExpo = "easeOutInExpo",
    outInQuad = "easeOutInQuad",
    outInQuart = "easeOutInQuart",
    outInQuint = "easeOutInQuint",
    outInSine = "easeOutInSine",
}

export const TransformRegex = {
    scale: /scale\((\d+(\.\d+)?)\)/,
};
