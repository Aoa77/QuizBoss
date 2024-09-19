import delayCalc from "./delayCalc";
import { Duration } from "./Duration";
import { Multiplier } from "./Multiplier";

///
export default function delay(
    duration: Duration | number,
    multiplier: Multiplier | number = Multiplier.x1,
): Promise<void> {
    const calc = delayCalc(duration, multiplier);
    return new Promise((resolve) => setTimeout(resolve, calc));
}
