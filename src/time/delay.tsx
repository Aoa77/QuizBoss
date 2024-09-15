import { delayCalc, Duration, Multiplier } from ".";

///
export default function delay(duration: Duration, multiplier: Multiplier = 1): Promise<void> {
    const calc = delayCalc(duration, multiplier);
    return new Promise((resolve) => setTimeout(resolve, calc));
}


