import { ButtonState } from "../models/ButtonState";
import { getElementButtons } from "../../core/xelemental/getElementButtons";
import { scaleButton } from "../animation/scaleButton";

export async function handleWrongGuess(): Promise<void> {
    const wrongButton = getElementButtons().find(
        (x) => x.className === ButtonState.WRONG,
    )!;
    await scaleButton(wrongButton);
}
