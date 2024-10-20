import { FlowContext } from "../libs/flow-context/FlowContext";
import { Task } from "../libs/csharp-sim/Task";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { QuestionImage } from "../components/QuestionImage";
import { QuizItem } from "../models/QuizItem";
import { QuizState } from "../models/QuizState";
import { EventName } from "../models/EventName";
import { LocalStore } from "../libs/flow-context/LocalStore";

export async function NextQuestion() {
    const [state, setState] = FlowContext.current<QuizState>();
    if (state.quizModule === null) {
        throw new Error("QuizModule is null");
    }

    const loadingSpinner = LoadingSpinner.animation;
    const questionImage = QuestionImage.animation;

    const MIN_HEIGHT = "MIN_HEIGHT";

    if (state.eventName === EventName.ShowResult) {
        const minHeight = LocalStore.numbers.read(MIN_HEIGHT);
        const img = questionImage.ref.current!.children[0];
        const imgHeight = img.clientHeight;
        const imgSrc = img.getAttribute("src");

        console.group();
        console.info("imgSrc: ", imgSrc);
        console.info("imgHeight: ", imgHeight);
        console.info("minHeight: ", minHeight);
        console.groupEnd();

        if (minHeight === null) {
            throw new Error("minHeight is null");
        }
        if (imgHeight < minHeight) {
            LocalStore.numbers.write(MIN_HEIGHT, imgHeight);
        }

        await Task.delay(5);
        ++state.currentItemIndex;
        if (state.currentItemIndex >= state.quizModule.quizData.items.length) {
            console.info("MIN_HEIGHT: ", minHeight);
            state.currentItemIndex = 0;
            return;
        }
        setState({ ...state, eventName: EventName.ShowResult });
        return;
    }

    LocalStore.numbers.write(MIN_HEIGHT, 999999999);
    // const currentGuessPool: string[] = [];
    const quizData = state.quizModule.quizData;
    const quizItems = quizData.items;
    const currentItem = quizItems[state.currentItemIndex];

    if (!isReady(currentItem, questionImage.ref.current!)) {
        await Task.delay(100);
        setState({ ...state, eventWait: ++state.eventWait });
        return;
    }

    await loadingSpinner.fadeOut.start();
    await questionImage.fadeIn.start();

    state.eventWait = 0;
    setState({ ...state, eventName: EventName.ShowResult });

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
