import { AppContext } from "../core/context";
import { EventKey } from ".";
import { ButtonState } from "../core/buttons";
import { QuizItem } from "../core/quiz";
import { DEMO, DemoMode } from "../core/demo";
import { randomInt } from "../libs/randos/randomInt";

export async function PrepQuestion() {
    ///
    const { settings, state, flow, timer } = AppContext.current(
        EventKey.PrepQuestion,
    );
    const { buttonAnswerMap, quizModule } = state;

    ///
    if (quizModule === null) {
        throw new Error("QuizModule is null");
    }
    const { quizData } = quizModule;

    ///
    const { items, randomizedGuessPool } = quizData;
    let { currentItemIndex } = state;
    ++currentItemIndex;
    if (currentItemIndex >= items.length) {
        currentItemIndex = 0;
    }

    ///
    const { guessButtonCount } = settings;
    const currentItem = items[currentItemIndex];
    const correctAnswerButtonIndex = randomInt(0, guessButtonCount);

    ///
    for (let bidx = 0; bidx < guessButtonCount; bidx++) {
        if (bidx === correctAnswerButtonIndex) {
            buttonAnswerMap[bidx] = currentItem;
            continue;
        }
        buttonAnswerMap[bidx] = selectRandomQuestionChoice(
            buttonAnswerMap,
            currentItem,
            randomizedGuessPool,
        );
    }

    ///
    buttonAnswerMap.forEach((item) => {
        item!.buttonStyle = ButtonState.disabled;
    });
    const itemScore = buttonAnswerMap.length - 1;

    ///
    const { demoMode } = settings;
    if (demoMode !== DemoMode.OFF) {
        DEMO.guess.length = 0;
    }

    ///
    timer.reset();

    ///
    flow.dispatch((state) => ({
        ...state,
        itemScore,
        buttonAnswerMap,
        currentItem,
        currentItemIndex,
        correctAnswerButtonIndex,
        eventName: EventKey.AskQuestion,
    }));
}

function selectRandomQuestionChoice(
    buttonAnswerMap: (QuizItem | null)[],
    currentItem: QuizItem,
    randomizedGuessPool: QuizItem[],
): QuizItem {
    ///
    const buttonAnswerMapKeys = buttonAnswerMap.map((item) => item?.key);
    RANDOMIZER.COUNT = 0;
    RANDOMIZER.FAILSAFE = randomizedGuessPool.length * RANDOMIZER.EFFORT;

    while (++RANDOMIZER.COUNT < RANDOMIZER.FAILSAFE) {
        ///
        if (++RANDOMIZER.INDEX === randomizedGuessPool.length) {
            RANDOMIZER.INDEX = 0;
        }

        ///
        const choiceItem = randomizedGuessPool[RANDOMIZER.INDEX];
        if (choiceItem.answeredCorrectly) {
            continue;
        }
        if (choiceItem.duplicateItemKeys.includes(currentItem.key)) {
            continue;
        }
        if (buttonAnswerMapKeys.includes(choiceItem.key)) {
            continue;
        }
        return choiceItem;
    }
    throw new Error("Failed to find a question choice.");
}

///
class RANDOMIZER {
    public static COUNT: number = 0;
    public static readonly EFFORT: number = 1;
    public static FAILSAFE: number = -1;
    public static INDEX: number = -1;
}
