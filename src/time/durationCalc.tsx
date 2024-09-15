import { Duration } from "./Duration";

export default function durationCalc(duration: Duration): number {
    if (!duration.value) {
        throw new Error("Duration value is required.");
    }
    if (!duration.multiplier) {
        duration.multiplier = 1;
    }
    duration.value = Math.abs(duration.value);
    duration.multiplier = Math.abs(duration.multiplier);
    return duration.value * duration.multiplier;
}
