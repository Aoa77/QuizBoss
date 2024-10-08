import { flow } from "../../core/context/flow";
import { QuizState } from "../models/QuizState";
import { handleCorrectGuess }    from "../animation/handleCorrectGuess";
import { handleWrongGuess }      from "../functions/handleWrongGuess";
import { lockButtons }           from "../functions/lockButtons";
import { resetWrongGuesses }     from "../functions/resetWrongGuesses";
import { unlockButtons }         from "../functions/unlockButtons";
import { wrongGuessesExhausted } from "../functions/wrongGuessesExhausted";
import { EventState }             from "../models/EventState";

const wrongGuesses: number[] = [];

export async function onResult() {
    const [state, setState] = flow<QuizState>();
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
        await handleCorrectGuess(wrongGuesses);

        if (1 + state.currentItemIndex === quizItems.length) {
           // setState({ ...state, event: EventState.GAMEOVER });
            return;
        }

        ///
        ++state.currentItemIndex;
        resetWrongGuesses(wrongGuesses);
        setState({ ...state, event: EventState.NextQuestion });
        return;
    }

    ///
    await handleWrongGuess();
    await unlockButtons(wrongGuesses);
    setState({ ...state, event: EventState.Input });
}
