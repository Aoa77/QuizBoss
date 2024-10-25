import { FlowContext } from "../libs/flow-context/FlowContext";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { QuestionImage } from "../components/QuestionImage";
import { QuizState } from "../models/QuizState";
import { Task, TaskGroup } from "../libs/friendlies/Task";
import { randomInt } from "../libs/randos/randomInt";
import { QuizData } from "../models/QuizData";
import { QuizItem } from "../models/QuizItem";
import { Duration } from "../libs/anime+/Constants";
// import { ButtonStyle } from "../models/ButtonStyle";

const config = {
    NEXT_IMAGE_DELAY: 1000,
};

export async function PrepQuestion() {
    const [state] = FlowContext.current<QuizState>();
    if (state.quizModule === null) {
        throw new Error("QuizModule is null");
    }

    const currentGuessPool: string[] = [];
    const quizData = state.quizModule.quizData;
    const quizItems = quizData.items;
    const currentItem = quizItems[state.currentItemIndex];

    state.answerButtonIndex = randomInt(0, state.settings.guessButtonCount);
    console.info("answerSpot: ", state.answerButtonIndex);

    await Task.delay(config.NEXT_IMAGE_DELAY);

    const anims = TaskGroup.create();
    const duration = Duration.oneSecond;
    anims.add(LoadingSpinner.animation.out({ duration }));
    anims.add(QuestionImage.animation.in({ delay: 0.5 * duration, duration }));
    await anims.all();

    state.answerButtonIndex = randomInt(0, state.settings.guessButtonCount);
    console.info("answerSpot: ", state.answerButtonIndex);

    bindGuessButtons(
        state.answerButtonIndex,
        state.settings.guessButtonCount,
        currentGuessPool,
        currentItem,
        quizData,
    );

    // const anims = new TaskGroup();
    // anims.add(TransitionAnimation.NextQuestionReady());
    // anims.add(QuestionAnimation.fadeIn());
    // anims.add(ProgressAnimation.fadeIn());
    // anims.add(ScoreAnimation.fadeIn());
    // await anims.all();

    // await ButtonGroupAnimation.fadeIn();
    // setState({ ...state, eventName: EventName.AwaitInput });
}

function bindGuessButtons(
    answerSpot: number,
    guessButtonCount: number,
    currentGuessPool: string[],
    currentItem: QuizItem,
    quizData: QuizData,
) {
    for (let buttonIndex = 0; buttonIndex < guessButtonCount; buttonIndex++) {
        let item = currentItem;
        if (buttonIndex !== answerSpot) {
            item = selectRandomQuestionChoice(
                currentGuessPool,
                currentItem,
                quizData,
            );
        }
        currentGuessPool.push(item.key);
        assignAnswerToButton(buttonIndex, item);
    }
}

function selectRandomQuestionChoice(
    currentGuessPool: string[],
    currentItem: QuizItem,
    quizData: QuizData,
): QuizItem {
    const { randomizedGuessPool } = quizData;

    RANDOMIZER.COUNT = 0;
    RANDOMIZER.FAILSAFE = randomizedGuessPool.length * RANDOMIZER.EFFORT;

    while (++RANDOMIZER.COUNT < RANDOMIZER.FAILSAFE) {
        //
        if (++RANDOMIZER.INDEX === randomizedGuessPool.length) {
            RANDOMIZER.INDEX = 0;
        }

        const choiceItem = randomizedGuessPool[RANDOMIZER.INDEX];

        if (choiceItem.answeredCorrectly) {
            continue;
        }

        if (choiceItem.duplicateItemKeys.includes(currentItem.key)) {
            continue;
        }

        if (currentGuessPool.includes(choiceItem.key)) {
            continue;
        }
        return choiceItem;
    }
    throw new Error("Failed to find a question choice.");
}

class RANDOMIZER {
    public static COUNT: number = 0;
    public static readonly EFFORT: number = 1;
    public static FAILSAFE: number = -1;
    public static INDEX: number = -1;
}

function assignAnswerToButton(buttonIndex: number, item: QuizItem) {
    console.debug("assignAnswerToButton", buttonIndex, item);
    // const buttons = xref.buttons();
    // const spotButton = buttons[buttonIndex];
    // spotButton.innerHTML = item.name;
    // spotButton.dataValue = item.key;
    // spotButton.className = ButtonStyle.NORMAL;
}
