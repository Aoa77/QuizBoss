import { ButtonState } from "../models/ButtonState";
import { getElementButtons } from "../../core/functions/getElementButtons";
import { PAUSE } from "../constants/times";
import { wait } from "../../core/xobjs/xanimation/wait";
import { scaleButtonBegin, scaleButtonEnd } from "../constants/scale";

export async function handleWrongGuess(): Promise<void> {
    const wrongButton = getElementButtons().find(
        (x) => x.className === ButtonState.WRONG,
    )!;
    await wrongButton.runAnimation(scaleButtonBegin());
    await wait(PAUSE.BRIEF);
    await wrongButton.runAnimation(scaleButtonEnd());
}
