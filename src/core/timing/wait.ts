import Duration from "./Duration";
import timeCalc from "./timeCalc";

///
export default function wait(time?: Duration): Promise<void> {
    const duration = timeCalc(time ?? {});
    return new Promise((resolve) => setTimeout(resolve, duration));
}
