import { getAppState } from "../functions/getAppState";
import { ELEMENT } from "../elements/ELEMENT";
import { bindGuessButtons } from "../functions/bindGuessButtons";
import { GameState } from "../models/GameState";
import { getElementButtons } from "../../core/functions/getElementButtons";
import { randomInt } from "../../core/functions/randomInt";
import { getElementDivs } from "../../core/functions/getElementDivs";
import { getElementHeadings } from "../../core/functions/getElementHeadings";

///
export async function onNext() {
    const [state, setState] = getAppState();
    if (!state.quizModule) {
        return;
    }

    const [appVersion, question] = getElementHeadings(
        ELEMENT.appVersion,
        ELEMENT.question,
    );
    const [buttonArea, image, loading, progress, scoreArea] = getElementDivs(
        ELEMENT.buttonArea,
        ELEMENT.image,
        ELEMENT.loading,
        ELEMENT.progress,
        ELEMENT.scoreArea,
    );

    const currentGuessPool: string[] = [];
    const quizData = state.quizModule.quizData;
    const quizItems = quizData.items;
    const currentItem = quizItems[state.currentItemIndex];

    //elements.clearScoreBonusStyle();
    state.answerSpot = randomInt(0, state.settings.guessButtonCount);
    console.info("answerSpot: ", state.answerSpot);

    const buttons = getElementButtons();
    await bindGuessButtons(
        state.answerSpot,
        state.settings.guessButtonCount,
        currentGuessPool,
        currentItem,
        quizData,
    );

    await loading.fadeOut();
    await appVersion.fadeIn();
    await image.fadeIn();
    await question.fadeIn();
    await buttonArea.fadeIn();
    await scoreArea.fadeIn();
    await progress.fadeIn();

    for (const button of buttons) {
        await button.fadeIn();
    }

    setState({ ...state, gameState: GameState.INPUT });
}
