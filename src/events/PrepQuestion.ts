import { FlowContext } from "../libs/flow-context/FlowContext";
import { QuizState } from "../models/QuizState";
import { randomInt } from "../libs/randos/randomInt";
import { QuizItem } from "../models/QuizItem";
import { EventName } from "../models/EventName";
import { ButtonStyle } from "../models/ButtonStyle";

export async function PrepQuestion() {
    const [state, setState] = FlowContext.current<QuizState>();
    if (state.quizModule === null) {
        throw new Error("QuizModule is null");
    }

    const guessButtonCount = state.settings.guessButtonCount;
    const quizItems = state.quizModule.quizData.items;

    ++state.currentItemIndex;
    if (state.currentItemIndex >= quizItems.length) {
        state.currentItemIndex = 0;
    }

    state.currentItem = quizItems[state.currentItemIndex];
    state.correctAnswerButtonIndex = randomInt(0, guessButtonCount);

    for (let bidx = 0; bidx < guessButtonCount; bidx++) {
        if (bidx === state.correctAnswerButtonIndex) {
            state.buttonAnswerMap[bidx] = state.currentItem;
            continue;
        }
        state.buttonAnswerMap[bidx] = selectRandomQuestionChoice(state);
    }

    state.buttonAnswerMap.forEach((item) => {
        item!.buttonStyle = ButtonStyle.normal; 
    });
    state.itemScore = state.buttonAnswerMap.length - 1;
    setState({ ...state, eventName: EventName.AskQuestion });
}

function selectRandomQuestionChoice(state: QuizState): QuizItem {

    if (state.currentItem === null) {
        throw new Error("state.currentItem === null");
    }
    if (state.quizModule === null) {
        throw new Error("state.quizModule === null");
    }
    
    const buttonAnswerMapKeys = state.buttonAnswerMap.map((item) => item?.key);
    const currentItem = state.currentItem;
    const quizData = state.quizModule.quizData;
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

        if (buttonAnswerMapKeys.includes(choiceItem.key)) {
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
