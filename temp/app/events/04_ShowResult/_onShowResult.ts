import { FlowContext } from "../../../../src/context/FlowContext";
import { EventName } from "../../../../src/models/EventName";
import { QuizState } from "../../../../src/models/QuizState";
import { handleCorrectGuess }    from "./handleCorrectGuess";
import { handleWrongGuess }      from "./handleWrongGuess";
import { lockButtons }           from "./lockButtons";
import { resetWrongGuesses }     from "./resetWrongGuesses";
import { unlockButtons }         from "./unlockButtons";
import { wrongGuessesExhausted } from "./wrongGuessesExhausted";

const wrongGuesses: number[] = [];

export async function onShowResult() {
    const [state, setState] = FlowContext.context<QuizState>();
    if (state.quizModule === null) {
        return;
    }

    const quizItems = state.quizModule.quizData.items;
    const currentItem = quizItems[state.currentItemIndex];
    const correctAnswer = currentItem.key;
    const isCorrectGuess = correctAnswer === state.guessValue;

    await lockButtons(currentItem, isCorrectGuess, wrongGuesses);
    if (isCorrectGuess || wrongGuessesExhausted(wrongGuesses)) {
        ///
        await handleCorrectGuess(state, wrongGuesses);

        if (1 + state.currentItemIndex === quizItems.length) {
           // setState({ ...state, event: EventName.GAMEOVER });
            return;
        }

        ///
        ++state.currentItemIndex;
        resetWrongGuesses(wrongGuesses);
        setState({ ...state, eventName: EventName.NextQuestion });
        return;
    }

    ///
    await handleWrongGuess();
    await unlockButtons(wrongGuesses);
    setState({ ...state, eventName: EventName.AwaitInput });
}
