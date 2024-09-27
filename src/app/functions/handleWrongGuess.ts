import { ButtonState } from "../models/ButtonState";
import { wait } from "../../core/functions/wait";
import { getElementButtons } from "../../core/functions/getElementButtons";
import { PAUSE } from "../constants/times";
import { scaleUp, scaleDown } from "../constants/scale";


export async function handleWrongGuess(): Promise<void> {
    const wrongButton = getElementButtons().find(
        (x) => x.className === ButtonState.WRONG,
    )!;
    await wrongButton.runAnimation(scaleUp);
    await wait(PAUSE.BRIEF);
    await wrongButton.runAnimation(scaleDown);
}
