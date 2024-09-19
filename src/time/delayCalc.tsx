import AppContext from "../app/AppContext";
import { Duration } from "./Duration";
import { Multiplier } from "./Multiplier";

export default function delayCalc(
    duration: Duration  | number,
    multiplier: Multiplier  | number,
): number {
    if (duration <= 0) {
        throw new Error("Delay duration must be greater than 0.");
    }
    if (multiplier <= 0) {
        throw new Error("Delay multiplier must be greater than 0.");
    }
    return (duration * multiplier) * AppContext.settings().speed;
}
