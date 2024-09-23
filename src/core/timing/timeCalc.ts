import { getSpeed } from "./useSpeed";
import Duration from "./Duration";

export default function timeCalc(time: Duration): number {
    time.duration ??= 1000;
    time.multiplier ??= 1;

    if (time.duration <= 0) {
        throw new Error("Delay duration must be greater than 0.");
    }
    if (time.multiplier <= 0) {
        throw new Error("Delay multiplier must be greater than 0.");
    }
    return time.duration * time.multiplier * getSpeed();
}


