import { flow } from "../../../core/context/flow";
import { QuizState } from "../../models/QuizState";
import { handleCorrectGuess }    from "./handleCorrectGuess";
import { handleWrongGuess }      from "./handleWrongGuess";
import { lockButtons }           from "./lockButtons";
import { resetWrongGuesses }     from "./resetWrongGuesses";
import { unlockButtons }         from "./unlockButtons";
import { wrongGuessesExhausted } from "./wrongGuessesExhausted";
import { EventState }             from "../../constants/EventState";

const wrongGuesses: number[] = [];

export async function onShowResult() {
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
    setState({ ...state, event: EventState.AwaitInput });
}
