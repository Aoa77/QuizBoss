import { wait } from "../../core/animation/wait";
import { getXrefButtons } from "../../core/elements/buttons";
import { getXrefDivs } from "../../core/elements/divs";
import { getXrefHeadings } from "../../core/elements/headings";
import { TIME } from "../elements/waitTimes";
import { ELEMENT } from "../elements/ELEMENT";
import { applyScoreAward } from "./applyScoreAward";
import { calcAward } from "./calcAward";
import { getCorrectAnswerButton } from "./getCorrectAnswerButton";
import { revealButtonScore } from "./revealButtonScore";

export async function handleCorrectGuess(
    wrongGuesses: number[],
): Promise<void> {
    //
    const [question] = getXrefHeadings(ELEMENT.question);
    const [image, loading] = getXrefDivs(ELEMENT.image, ELEMENT.loading);

    const correctButton = getCorrectAnswerButton();
    const wrongButtons = getXrefButtons().filter(
        (x) => x.id !== correctButton.id,
    );
    const award: number = calcAward(wrongGuesses);

    await correctButton.scaleUp();
    await wait(TIME.REVEAL_BUTTON_STATUS);
    revealButtonScore(award, correctButton);
    await wait(TIME.REVEAL_BUTTON_STATUS);
    
    await question.fadeOut();
    await applyScoreAward(award);
    for (const button of wrongButtons) {
        await button.fadeOut();
    }
    
    await wait(TIME.REVEAL_BUTTON_STATUS);
    await correctButton.scaleDown();
    await image.fadeOut();

    await loading.fadeOut();
    await correctButton.fadeOut();
}
