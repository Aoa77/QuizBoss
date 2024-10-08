import { flow } from "../../core/context/flow";
import { QuizState } from "../models/QuizState";
import { ELEMENT } from "../animation/elements";
import { bindGuessButtons } from "../functions/bindGuessButtons";
import { EventState } from "../models/EventState";
import { randomInt } from "../../core/util/randomInt";
import { fadeOut, fadeIn } from "../../core/animation/fade";
import { xref } from "../../core/animation/dom/xref";

///
export async function onNext() {
    const [state, setState] = flow<QuizState>();
    if (!state.quizModule) {
        return;
    }

    const [question] = xref.headings(ELEMENT.question);
    const [buttonArea, image, loading, progress, scoreArea] = xref.divs(
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

    const buttons = xref.buttons();
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

    setState({ ...state, event: EventState.Input });
}
