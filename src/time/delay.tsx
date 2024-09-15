import { Duration } from "./Duration";
import durationCalc from "./durationCalc";

export default function delay(duration: Duration): Promise<void> {
    const time = durationCalc(duration);
    return new Promise((resolve) => setTimeout(resolve, time));
}