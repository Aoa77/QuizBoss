import { ButtonState } from "../models/ButtonState";
import { wait } from "../../core/functions/wait";
import { getElementButtons } from "../../core/functions/getElementButtons";
import { TIME } from "../elements/waitTimes";

export async function handleWrongGuess(): Promise<void> {
    const wrongButton = getElementButtons().find(
        (x) => x.className === ButtonState.WRONG,
    )!;
    await wrongButton.scaleUp();
    await wait(TIME.BRIEF_PAUSE);
    await wrongButton.scaleDown();
}
