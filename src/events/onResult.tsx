import AppContext from "../app/AppContext";
import ButtonElement from "../elements/buttons/ButtonElement";
import handleCorrectGuess from "../functions/handleCorrectGuess";
import handleWrongGuess from "../functions/handleWrongGuess";
import lockButtons from "../functions/lockButtons";
import { resetWrongGuesses } from "../functions/resetWrongGuesses";
import unlockButtons from "../functions/unlockButtons";
import { wrongGuessesExauhsted } from "../functions/wrongGuessesExauhsted";
import { GameState } from "../state/GameState";

///
const tasks: Promise<void>[] = [];
const wrongGuesses: number[] = [];

export async function onResult(context: AppContext) {
    const { elements, states } = context;
    const { state, setState } = states;
    if (state.quizModule === null) {
        return;
    }
    const { guessButtons } = elements;

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
        tasks,
    );

    if (isCorrectGuess || wrongGuessesExauhsted(guessButtons, wrongGuesses)) {
        ///
        await handleCorrectGuess(
            correctButton,
            elements,
            guessButtons,
            wrongGuesses,
            state,
            tasks,
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
    await handleWrongGuess(guessButtons, elements, tasks);
    await unlockButtons(guessButtons, wrongGuesses);
    setState({ ...state, gameState: GameState.INPUT });
}
