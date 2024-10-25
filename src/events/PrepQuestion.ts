import { FlowContext } from "../libs/flow-context/FlowContext";
import { QuizState } from "../models/QuizState";
import { randomInt } from "../libs/randos/randomInt";
import { QuizData } from "../models/QuizData";
import { QuizItem } from "../models/QuizItem";
import { EventName } from "../models/EventName";


export async function PrepQuestion() {
    const [state, setState] = FlowContext.current<QuizState>();
    if (state.quizModule === null) {
        throw new Error("QuizModule is null");
    }

    ++state.currentItemIndex;
    if (state.currentItemIndex >= state.quizModule.quizData.items.length) {
        state.currentItemIndex = 0;
    }
    
    const currentGuessPool: string[] = [];
    const quizData = state.quizModule.quizData;
    const quizItems = quizData.items;
    const currentItem = quizItems[state.currentItemIndex];

    state.answerButtonIndex = randomInt(0, state.settings.guessButtonCount);
    console.info("answerButtonIndex: ", state.answerButtonIndex);

    bindGuessButtons(
        state.answerButtonIndex,
        state.settings.guessButtonCount,
        currentGuessPool,
        currentItem,
        quizData,
    );

    ///
    setState({ ...state, eventName: EventName.AskQuestion });

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
