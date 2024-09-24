import { getAppStateFlow }       from "../appFlow/useFlow";
import { handleCorrectGuess }    from "../functions/handleCorrectGuess";
import { handleWrongGuess }      from "../functions/handleWrongGuess";
import { lockButtons }           from "../functions/lockButtons";
import { resetWrongGuesses }     from "../functions/resetWrongGuesses";
import { unlockButtons }         from "../functions/unlockButtons";
import { wrongGuessesExauhsted } from "../functions/wrongGuessesExauhsted";
import { GameState }             from "../models/GameState";

const wrongGuesses: number[] = [];

export async function onResult() {
    const [state, setState] = getAppStateFlow();
    if (state.quizModule === null) {
        return;
    }

    const quizItems = state.quizModule.quizData.items;
    const currentItem = quizItems[state.currentItemIndex];
    const correctAnswer = currentItem.key;
    const isCorrectGuess = correctAnswer === state.guessValue;

    await lockButtons(currentItem, isCorrectGuess, wrongGuesses);
    if (isCorrectGuess || wrongGuessesExauhsted(wrongGuesses)) {
        ///
        await handleCorrectGuess(wrongGuesses);

        if (1 + state.currentItemIndex === quizItems.length) {
            setState({ ...state, gameState: GameState.GAMEOVER });
            return;
        }

        ///
        ++state.currentItemIndex;
        resetWrongGuesses(wrongGuesses);
        setState({ ...state, gameState: GameState.LOADING });
        return;
    }

    ///
    await handleWrongGuess();
    await unlockButtons(wrongGuesses);
    setState({ ...state, gameState: GameState.INPUT });
}
