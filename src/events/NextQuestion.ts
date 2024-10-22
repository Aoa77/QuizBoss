import { FlowContext } from "../libs/flow-context/FlowContext";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { QuestionImage } from "../components/QuestionImage";
import { QuizState } from "../models/QuizState";
import { Task } from "../libs/friendlies/Task";

const config = {
    NEXT_IMAGE_DELAY: 1000,
};

export async function NextQuestion() {
    const [state] = FlowContext.current<QuizState>();
    if (state.quizModule === null) {
        throw new Error("QuizModule is null");
    }

    await Task.delay(config.NEXT_IMAGE_DELAY);
    const loadingSpinner = LoadingSpinner.animation;
    const questionImage = QuestionImage.animation;

    // const currentGuessPool: string[] = [];
    // const quizData = state.quizModule.quizData;
    // const quizItems = quizData.items;
    // const currentItem = quizItems[state.currentItemIndex];

    await loadingSpinner.transitionOut();
    await questionImage.transitionIn();

    // setState({ ...state, eventName: EventName.ShowResult });

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
