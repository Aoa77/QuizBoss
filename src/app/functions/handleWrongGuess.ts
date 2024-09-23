import { ButtonState } from "../models/ButtonState";
import { wait } from "../../core/animation/wait";
import { getXrefButtons } from "../../core/elements/buttons";
import { TIME } from "../elements/constants";

export async function handleWrongGuess(): Promise<void> {
    const wrongButton = getXrefButtons().find(
        (x) => x.className === ButtonState.WRONG,
    )!;
    await wrongButton.scaleUp();
    await wait(TIME.WAIT);
    await wrongButton.scaleDown();
}
