import AppContext from "../app/AppContext";
import bindGuessButtons from "../functions/bindGuessButtons";
import randomInt from "../random/randomInt";
import { GameState } from "../state/GameState";

///
export async function onNext(context: AppContext) {
    const { elements, states } = context;
    const { state, setState } = states;
    const { refs, guessButtons } = elements;
    const {
        appVersion,
        buttonArea,
        image,
        loading,
        progress,
        question,
        scoreArea,
    } = refs;

    if (state.quizModule === null) {
        return;
    }

    const currentGuessPool: string[] = [];
    const quizData = state.quizModule.quizData;
    const quizItems = quizData.items;
    const currentItem = quizItems[state.currentItemIndex];

    elements.clearScoreBonusStyle();
    state.answerSpot = randomInt(0, guessButtons.length);
    console.info("answerSpot: ", state.answerSpot);

    await bindGuessButtons(
        state.answerSpot,
        currentGuessPool,
        currentItem,
        guessButtons,
        quizData,
    );

    await elements.fadeOut(loading.target);
    await elements.fadeIn(image.target);
    await elements.fadeIn(appVersion.target);
    await elements.fadeIn(question.target);
    await elements.fadeIn(buttonArea.target);
    await elements.fadeIn(scoreArea.target);
    await elements.fadeIn(progress.target);
    await elements.fadeIn(appVersion.target);

    for (const button of guessButtons) {
        await elements.fadeIn(button.target);
    }

    setState({ ...state, gameState: GameState.INPUT });
}
