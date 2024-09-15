///
export function delay(duration: number, multiplier: number = 1): Promise<void> {
    const calc = delayCalc(duration, multiplier);
    return new Promise((resolve) => setTimeout(resolve, calc));
}

export function delayCalc(duration: number, multiplier: number): number {
    if (duration < 1) {
        throw new Error("Delay duration must be greater than 0.");
    }
    if (multiplier < 1) {
        throw new Error("Delay multiplier must be greater than 0.");
    }
    return duration * multiplier;
}

export const Duration = {
    BLINK: 150,
    BLINKS: 16,
    DEMO: 200,
    FADE: 250,
    POLL: 50,
    SCALE: 1000,
    THROTTLE: 25,
    WAIT: 500,
};
