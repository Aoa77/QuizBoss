import { QuizState } from "../code/QuizState";
import { randomInt } from "../libs/randos/randomInt";
import { QuizItem } from "../code/QuizItem";
import { assertFlowEvent, EventName } from "../code/EventName";
import { ButtonStyle } from "../code/ButtonStyle";
import { DEMO, DemoMode } from "../code/DemoMode";
import { FlowContext } from "../libs/flow-context/FlowContext";
import { Timer } from "../code/Timer";

export async function PrepQuestion() {
    ///
    assertFlowEvent(EventName.PrepQuestion);
    const [state, setState] = FlowContext.current<QuizState>();
    const { buttonAnswerMap, quizModule, settings } = state;

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
        item!.buttonStyle = ButtonStyle.disabled;
    });
    const itemScore = buttonAnswerMap.length - 1;

    ///
    const { demoMode } = settings;
    if (demoMode !== DemoMode.OFF) {
        DEMO.guess.length = 0;
    }

    ///
    Timer.instance().reset();

    ///
    setState((state) => ({
        ...state,
        itemScore,
        buttonAnswerMap,
        currentItem,
        currentItemIndex,
        correctAnswerButtonIndex,
        eventName: EventName.AskQuestion,
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
