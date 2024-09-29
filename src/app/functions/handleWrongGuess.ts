import { ButtonState } from "../models/ButtonState";
import { getElementButtons } from "../../core/functions/getElementButtons";
import { scaleButton } from "../animation/scale";

export async function handleWrongGuess(): Promise<void> {
    const wrongButton = getElementButtons().find(
        (x) => x.className === ButtonState.WRONG,
    )!;
    await scaleButton(wrongButton);
}
