import { getAppState } from "../functions/getAppState";
import { ELEMENT } from "../constants/elements";
import { bindGuessButtons } from "../functions/bindGuessButtons";
import { GameState } from "../models/GameState";
import { getElementButtons } from "../../core/functions/getElementButtons";
import { randomInt } from "../../core/functions/randomInt";
import { getElementDivs } from "../../core/functions/getElementDivs";
import { getElementHeadings } from "../../core/functions/getElementHeadings";
import { fadeOut, fadeIn } from "../constants/fade";

///
export async function onNext() {
    const [state, setState] = getAppState();
    if (!state.quizModule) {
        return;
    }

    const [question] = getElementHeadings(
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

    await Promise.all([
        loading.runAnimation(fadeOut),
        image.runAnimation(fadeIn),
        question.runAnimation(fadeIn),
        buttonArea.runAnimation(fadeIn),
        scoreArea.runAnimation(fadeIn),
        progress.runAnimation(fadeIn),
    ]);

    for (const button of buttons) {
        await button.runAnimation(fadeIn);
    }

    setState({ ...state, gameState: GameState.INPUT });
}
