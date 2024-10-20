import { FlowContext } from "../../../../src/libs/flow-context/FlowContext";
import { QuizState } from "../../../../src/models/QuizState";
import { bindGuessButtons } from "./bindGuessButtons";

import { randomInt } from "../../../../src/libs/random-funcs/randomInt";
import { ButtonGroupAnimation } from "../../animations/ButtonGroupAnimation";
import { TaskGroup } from "../../../../src/libs/csharp-sim/Task";
import { TransitionAnimation } from "../../animations/TransitionAnimation";
import { ScoreAnimation } from "../../components/ScoreDisplay.animation";
import { ProgressAnimation } from "../../components/ProgressDisplay.animation";
import { QuestionAnimation } from "../../components/QuestionHeading.animation";
import { EventName } from "../../../../src/models/EventName";

///
export async function onNextQuestion() {
    const [state, setState] = FlowContext.current<QuizState>();
    if (state.quizModule === null) {
        throw new Error("QuizModule is null");
    }

    const currentGuessPool: string[] = [];
    const quizData = state.quizModule.quizData;
    const quizItems = quizData.items;
    const currentItem = quizItems[state.currentItemIndex];
    // const [questionImage] = xref.divs(ELEMENT.questionImage);

    // if (false) {//!isReady(currentItem, questionImage.element)) {
    //     await wait(TIME.LOADING_POLL);
    //     setState({ ...state, eventWait: ++state.eventWait });
    //     return;
    // }

    state.answerSpot = randomInt(0, state.settings.guessButtonCount);
    console.info("answerSpot: ", state.answerSpot);

    await bindGuessButtons(
        state.answerSpot,
        state.settings.guessButtonCount,
        currentGuessPool,
        currentItem,
        quizData,
    );

    const anims = new TaskGroup();
    anims.add(TransitionAnimation.NextQuestionReady());
    anims.add(QuestionAnimation.fadeIn());
    anims.add(ProgressAnimation.fadeIn());
    anims.add(ScoreAnimation.fadeIn());
    await anims.all();

    await ButtonGroupAnimation.fadeIn();
    setState({ ...state, eventName: EventName.AwaitInput });
}

