import { ELEMENT } from "../elements/constants";
import { GameState } from "../models/GameState";
import { getAppStateFlow } from "../appFlow/useFlow";
import { bindGuessButtons } from "../functions/bindGuessButtons";
import { getXrefButtons } from "../../core/elements/buttons";
import { getXrefDivs } from "../../core/elements/divs";
import { getXrefHeadings } from "../../core/elements/headings";
import { randomInt } from "../../core/random/randomInt";

///
export async function onNext() {
    const [state, setState] = getAppStateFlow();
    if (!state.quizModule) {
        return;
    }

    const [appVersion, question] = getXrefHeadings(
        ELEMENT.appVersion,
        ELEMENT.question,
    );
    const [buttonArea, image, loading, progress, scoreArea] = getXrefDivs(
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

    const buttons = getXrefButtons();
    await bindGuessButtons(
        state.answerSpot,
        currentGuessPool,
        currentItem,
        buttons,
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
