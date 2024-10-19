import { Flow } from "../../../core/flow/Flow";
import { QuizState } from "../../models/QuizState";
import { bindGuessButtons } from "./bindGuessButtons";
import { EventState } from "../../constants/EventState";
import { randomInt } from "../../../core/util/randomInt";
import { wait } from "../../../core/animation/wait";
import { TIME } from "../../constants/TIME";
import { ButtonGroupAnimation } from "../../animations/ButtonGroupAnimation";
import { QuizItem } from "../../models/QuizItem";
import { xref } from "../../../core/animation/dom/xref";
import { ELEMENT } from "../../constants/ELEMENT";
import { AsyncGroup } from "../../../core/util/AsyncGroup";
import { TransitionAnimation } from "../../animations/TransitionAnimation";
import { ScoreAnimation } from "../../components/ScoreDisplay.animation";
import { ProgressAnimation } from "../../components/ProgressDisplay.animation";
import { QuestionAnimation } from "../../components/QuestionHeading.animation";

///
export async function onNextQuestion() {
    const [state, setState] = Flow.context<QuizState>();
    if (state.quizModule === null) {
        throw new Error("QuizModule is null");
    }

    const currentGuessPool: string[] = [];
    const quizData = state.quizModule.quizData;
    const quizItems = quizData.items;
    const currentItem = quizItems[state.currentItemIndex];
    const [questionImage] = xref.divs(ELEMENT.questionImage);

    if (!isReady(currentItem, questionImage.element)) {
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

    const anims = new AsyncGroup();
    anims.add(TransitionAnimation.NextQuestionReady());
    anims.add(QuestionAnimation.fadeIn());
    anims.add(ProgressAnimation.fadeIn());
    anims.add(ScoreAnimation.fadeIn());
    await anims.all();

    await ButtonGroupAnimation.fadeIn();
    setState({ ...state, event: EventState.AwaitInput });
}

function isReady(currentItem: QuizItem, questionImage: HTMLElement) {
    return (
        currentItem && currentItem.isLoaded && questionImage.children.length > 0
    );
}