import { getStateFlow } from "../../core/state-flow/getStateFlow";
import { AppState } from "../models/AppState";
import { ELEMENT } from "../animation/elements";
import { bindGuessButtons } from "../functions/bindGuessButtons";
import { GameState } from "../models/GameState";
import { getElementButtons } from "../../core/xelemental/getElementButtons";
import { randomInt } from "../../core/random-fx/randomInt";
import { getElementDivs } from "../../core/xelemental/getElementDivs";
import { getElementHeadings } from "../../core/xelemental/getElementHeadings";
import { fadeOut, fadeIn } from "../../core/anime-x/fade";

///
export async function onNext() {
    const [state, setState] = getStateFlow<AppState>();
    if (!state.quizModule) {
        return;
    }

    const [question] = getElementHeadings(ELEMENT.question);
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
        loading
            .runAnimation(fadeOut())
            .then(() => image.runAnimation(fadeIn())),
        question.runAnimation(fadeIn()),
        buttonArea.runAnimation(fadeIn()),
        scoreArea.runAnimation(fadeIn()),
        progress.runAnimation(fadeIn()),
    ]);

    for (const button of buttons) {
        await button.runAnimation(fadeIn());
    }

    setState({ ...state, gameState: GameState.INPUT });
}
