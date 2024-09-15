import { AppContext, GameState } from "../app";
import { ButtonState } from "../buttons";

var wrongGuesses: number[] = [];

///
export async function onResult(context: AppContext) {
    const { config, elements, states, time } = context;
    const { state, setState } = states;
    if (state.quizModule === null) {
        return;
    }

    const { guessButtonCount } = config;
    const { refs, guessButtons } = elements;
    const { buttonArea, image, loading, question } = refs;

    const quizItems = state.quizModule.quizData.items;
    const currentItem = quizItems[state.currentItemIndex];
    const correctAnswer = currentItem.key;
    const isCorrectGuess = correctAnswer === state.guessValue;

    const correctButton = await lockButtons();
    if (isCorrectGuess || wrongGuessesExauhsted()) {
        await handleCorrectGuess();
        setState({ ...state });
        return;
    }

    await time.delay();
    unlockButtons();
    setState({ ...state, gameState: GameState.INPUT });
    return;

    function resetWrongGuesses(): void {
        wrongGuesses = [];
    }
    function wrongGuessesExauhsted(): boolean {
        return wrongGuesses.length === guessButtonCount - 1;
    }

    async function lockButtons(): Promise<HTMLButtonElement | null> {
        let correctButton: HTMLButtonElement | null = null;
        for (let guess = 0; guess < guessButtonCount; guess++) {
            const guessButton = guessButtons[guess].ref.current!;
            if (guessButton.className === ButtonState.DISABLED) {
                continue;
            }
            if (guessButton.className === ButtonState.HIDDEN) {
                continue;
            }
            if (state.guessValue !== guessButton.value) {
                guessButton.className = ButtonState.DIMMED;
                continue;
            }
            if (isCorrectGuess) {
                correctButton = guessButton;
                correctButton!.className = ButtonState.CORRECT;
                currentItem.answeredCorrectly = true;
                continue;
            }
            wrongGuesses.push(guess);
            guessButton.className = ButtonState.WRONG;
            if (wrongGuessesExauhsted()) {
                await revealCorrectAnswer();
                break;
            }
        }
        return correctButton;

        async function revealCorrectAnswer() {
            await time.delay();
            unlockButtons();

            for (let i = 0; i < guessButtonCount; i++) {
                if (wrongGuesses.includes(i)) {
                    continue;
                }
                correctButton = guessButtons[i].ref.current!;
                await elements.blinkButton(correctButton);
                currentItem.answeredCorrectly = true;
                break;
            }
        }
    }

    async function handleCorrectGuess() {
        //
        const rightButton = guessButtons.find(
            (b) => b.target === correctButton!.id,
        )!;
        const wrongButtons = guessButtons.filter(
            (b) => b.target !== correctButton!.id,
        );

        await elements.scaleIn(rightButton.target,{});
        await Promise.all(wrongButtons.map((b) => elements.fadeOut(b.target,{})));
        await time.delay();

        // await Promise.all([
        //     elements.fadeOut(question.target),
        //     elements.fadeOut(image.target),
        // ]);

        // await Promise.all([
        //     button.scaleIn().then(() => button.hold()),
        //     question.hold().then(() => question.fadeOut()),
        // ]);

        // const award = guessButtonCount - wrongGuesses.length - 1;
        // await Promise.all([
        //     ...others.map((b) => b.fadeOut()),
        //     applyScoreAward(award),
        // ]);

        // await Promise.all([
        //     button.scaleOut().then(() => button.fadeOut()),
        //     image.fadeOut(),
        //     loading.fadeIn().then(() => loading.hold()),
        // ]);

        if (1 + state.currentItemIndex === quizItems.length) {
            onGameOver();
            return;
        }

        //      elements.hideQuestion();
        ++state.currentItemIndex;
        resetWrongGuesses();
        state.gameState = GameState.LOADING;
    }

    function onGameOver() {
        const prompt = question.object.current!;
        prompt.innerHTML = "[ play again ]";
        prompt.classList.add("prompt");
        prompt.onclick = async () => {
            //
            // elements.hideTitle();
            // elements.hideButtonsSection();
            // elements.hideScoreArea();
            // elements.hideProgressSection();
            // elements.hideQuestion();
            // elements.hideAppVersion();
            //
            // elements.animate.loading.fadeIn();
            window.location.reload();
        };
        state.gameState = GameState.GAMEOVER;
    }

    async function applyScoreAward(award: number) {
        if (award === 0) {
            return;
        }

        state.score = await elements.scoreUpdate(
            state.score,
            award,
            correctButton!,
        );
        if (state.score > state.best) {
            state.best = state.score;
            localStorage.setItem("bestScore", state.best.toString());
        }
        await time.delay();
    }

    function unlockButtons() {
        for (let guess = 0; guess < guessButtonCount; guess++) {
            const ref = guessButtons[guess].ref.current!;
            switch (ref.className) {
                case ButtonState.DIMMED:
                    if (!wrongGuesses.includes(guess)) {
                        ref.className = ButtonState.NORMAL;
                    }
                    break;
                case ButtonState.WRONG:
                    ref.className = ButtonState.DIMMED;
                    break;
                default:
                    break;
            }
        }
    }
}
