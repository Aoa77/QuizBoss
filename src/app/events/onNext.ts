import AppContext from "../AppContext";
import bindGuessButtons from "../functions/bindGuessButtons";
import randomInt from "../../core/random/randomInt";
import { GameState } from "../models/GameState";

///
export default async function onNext() {
    const appState = AppContext.appState();
    const [state, setState] = appState;
    if (state.quizModule === null) {
        return;
    }

    const elements = AppContext.elements();
    const { refs } = elements;
    const {
        appVersion,
        buttonArea,
        buttons,
        image,
        loading,
        progress,
        question,
        scoreArea,
    } = refs;

    const currentGuessPool: string[] = [];
    const quizData = state.quizModule.quizData;
    const quizItems = quizData.items;
    const currentItem = quizItems[state.currentItemIndex];

    elements.clearScoreBonusStyle();
    state.answerSpot = randomInt(0, buttons.length);
    console.info("answerSpot: ", state.answerSpot);

    await bindGuessButtons(
        state.answerSpot,
        currentGuessPool,
        currentItem,
        buttons,
        quizData,
    );

    await elements.fadeOut(loading);
    await elements.fadeIn(image);
    await elements.fadeIn(appVersion);
    await elements.fadeIn(question);
    await elements.fadeIn(buttonArea);
    await elements.fadeIn(scoreArea);
    await elements.fadeIn(progress);
    await elements.fadeIn(appVersion);

    for (const button of buttons) {
        await elements.fadeIn(button);
    }

    setState({ ...state, gameState: GameState.INPUT });
}
