import { $LoadingSpinner } from "../components/LoadingSpinner";
import { $QuestionImage } from "../components/QuestionImage";
import { Task } from "../libs/csharp-sim/Task";
import { FlowContext } from "../libs/flow-context/FlowContext";
import { QuizItem } from "../models/QuizItem";
import { QuizState } from "../models/QuizState";

export async function NextQuestion() {
    const [state, setState] = FlowContext.current<QuizState>();
    if (state.quizModule === null) {
        throw new Error("QuizModule is null");
    }

    // const currentGuessPool: string[] = [];
    const quizData = state.quizModule.quizData;
    const quizItems = quizData.items;
    const currentItem = quizItems[state.currentItemIndex];

    if (!isReady(currentItem, $QuestionImage.ref.current!)) {
        await Task.delay(100);
        setState({ ...state, eventWait: ++state.eventWait });
        return;
    }

    await $LoadingSpinner.fadeOut.start();
    await $QuestionImage.fadeIn.start();

    // state.answerSpot = randomInt(0, state.settings.guessButtonCount);
    // console.info("answerSpot: ", state.answerSpot);

    // await bindGuessButtons(
    //     state.answerSpot,
    //     state.settings.guessButtonCount,
    //     currentGuessPool,
    //     currentItem,
    //     quizData,
    // );

    // const anims = new TaskGroup();
    // anims.add(TransitionAnimation.NextQuestionReady());
    // anims.add(QuestionAnimation.fadeIn());
    // anims.add(ProgressAnimation.fadeIn());
    // anims.add(ScoreAnimation.fadeIn());
    // await anims.all();

    // await ButtonGroupAnimation.fadeIn();
    // setState({ ...state, eventName: EventName.AwaitInput });
}

function isReady(currentItem: QuizItem, section: HTMLDivElement) {
    return currentItem && currentItem.isLoaded && section.children.length > 0;
}
