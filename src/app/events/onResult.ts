import AppContext from "../AppContext";
import handleCorrectGuess from "../functions/handleCorrectGuess";
import handleWrongGuess from "../functions/handleWrongGuess";
import lockButtons from "../functions/lockButtons";
import { resetWrongGuesses } from "../functions/resetWrongGuesses";
import unlockButtons from "../functions/unlockButtons";
import { wrongGuessesExauhsted } from "../functions/wrongGuessesExauhsted";
import { GameState } from "../models/GameState";

///
// const tasks: Promise<void>[] = [];
const wrongGuesses: number[] = [];

export default async function onResult() {
    const appState = AppContext.appState();
    const [state, setState] = appState;
    if (state.quizModule === null) {
        return;
    }

    const elements = AppContext.elements();
    const { refs } = elements;
    const { buttons } = refs;

    const quizItems = state.quizModule.quizData.items;
    const currentItem = quizItems[state.currentItemIndex];
    const correctAnswer = currentItem.key;
    const isCorrectGuess = correctAnswer === state.guessValue;

    const correctButton: ButtonElement = await lockButtons(
        currentItem,
        elements,
        guessButtons,
        isCorrectGuess,
        state,
        wrongGuesses,
    );

    if (isCorrectGuess || wrongGuessesExauhsted(guessButtons, wrongGuesses)) {
        ///
        await handleCorrectGuess(
            correctButton,
            elements,
            guessButtons,
            wrongGuesses,
            state,
        );

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
    await handleWrongGuess(guessButtons, elements);
    await unlockButtons(guessButtons, wrongGuesses);
    setState({ ...state, gameState: GameState.INPUT });
}
