import { Duration, Multiplier } from ".";

export default function delayCalc(duration: Duration, multiplier: Multiplier): number {
    if (duration < 1) {
        throw new Error("Delay duration must be greater than 0.");
    }
    if (multiplier < 1) {
        throw new Error("Delay multiplier must be greater than 0.");
    }
    return duration * multiplier;
}
