import { flow } from "../../../core/context/flow";
import { QuizState } from "../../models/QuizState";
import { bindGuessButtons } from "./bindGuessButtons";
import { EventState } from "../../constants/EventState";
import { randomInt } from "../../../core/util/randomInt";
import { wait } from "../../../core/animation/wait";
import { QuestionImage } from "../../animations/QuestionImage";
import { TIME } from "../../constants/TIME";
import { LoadingSpinner } from "../../animations/LoadingSpinner";
import { ButtonGroupAnimation } from "../../animations/ButtonGroupAnimation";
import { QuizItem } from "../../models/QuizItem";
import { LayoutAnimation } from "../../animations/LayoutAnimation";

///
export async function onNextQuestion() {
    const [state, setState] = flow<QuizState>();
    if (state.quizModule === null) {
        throw new Error("QuizModule is null");
    }

    const currentGuessPool: string[] = [];
    const quizData = state.quizModule.quizData;
    const quizItems = quizData.items;
    const currentItem = quizItems[state.currentItemIndex];

    if (!isReady(currentItem)) {
        await wait(TIME.LOADING_POLL);
        setState({ ...state, eventWait: ++state.eventWait });
        return;
    }

    state.answerSpot = randomInt(0, state.settings.guessButtonCount);
    console.info("answerSpot: ", state.answerSpot);

    await bindGuessButtons(
        state.answerSpot,
        state.settings.guessButtonCount,
        currentGuessPool,
        currentItem,
        quizData,
    );

    await Promise.all([
        LoadingSpinner.fadeOut().then(() => QuestionImage.fadeIn()),
        LayoutAnimation.QuestionHeading.fadeIn(),
        LayoutAnimation.ScoreArea.fadeIn(),
    ]);

    await ButtonGroupAnimation.fadeIn();
    setState({ ...state, event: EventState.AwaitInput });
}

function isReady(currentItem: QuizItem) {
    return (
        currentItem &&
        currentItem.isLoaded &&
        QuestionImage.element().children.length > 0
    );
}
