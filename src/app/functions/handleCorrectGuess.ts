import { wait } from "../../core/animation/wait";
import { getXrefButtons } from "../../core/elements/buttons";
import { getXrefDivs } from "../../core/elements/divs";
import { ELEMENT, TIME } from "../elements/constants";
import { applyScoreAward } from "./applyScoreAward";
import { calcAward } from "./calcAward";
import { getCorrectAnswerButton } from "./getCorrectAnswerButton";
import { revealButtonScore } from "./revealButtonScore";

export async function handleCorrectGuess(
    wrongGuesses: number[],
): Promise<void> {
    //
    const [image, loading, question] = getXrefDivs(
        ELEMENT.image,
        ELEMENT.loading,
        ELEMENT.question,
    );

    const correctButton = getCorrectAnswerButton();
    const wrongButtons = getXrefButtons().filter(
        (x) => x.id !== correctButton.id,
    );
    const award: number = calcAward(wrongGuesses);

    await correctButton.scaleUp();
    await wait(TIME.WAIT * 3);
    revealButtonScore(award, correctButton);

    await question.fadeOut();
    await applyScoreAward(award);
    for (const button of wrongButtons) {
        await button.fadeOut();
    }

    await wait(TIME.WAIT * 2);
    await correctButton.scaleDown();
    await image.fadeOut();

    await loading.fadeOut();
    await correctButton.fadeOut();
}
