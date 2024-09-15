import { AppContext, GameState } from "../app";
import { ButtonElement, ButtonState } from "../buttons";

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

    const correctButton: ButtonElement | null = await lockButtons();
    const correctButtonRef: HTMLButtonElement | null | undefined =
        correctButton?.ref.current;

    if (isCorrectGuess || wrongGuessesExauhsted()) {
        await handleCorrectGuess();
        setState({ ...state });
        return;
    }

    await unlockButtons();
    setState({ ...state, gameState: GameState.INPUT });
    return;

    function resetWrongGuesses(): void {
        wrongGuesses = [];
    }
    function wrongGuessesExauhsted(): boolean {
        return wrongGuesses.length === guessButtonCount - 1;
    }

    async function lockButtons(): Promise<ButtonElement | null> {
        let correctButton: ButtonElement | null = null;
        let correctButtonRef: HTMLButtonElement | null = null;

        for (let guess = 0; guess < guessButtonCount; guess++) {
            //
            const guessButton = guessButtons[guess];
            const guessButtonRef = guessButton.ref.current!;

            if (guessButtonRef.className === ButtonState.DISABLED) {
                continue;
            }
            if (guessButtonRef.className === ButtonState.HIDDEN) {
                continue;
            }
            if (state.guessValue !== guessButtonRef.value) {
                guessButtonRef.className = ButtonState.DIMMED;
                continue;
            }

            if (isCorrectGuess) {
                correctButton = guessButton;
                correctButtonRef = correctButton.ref.current!;
                correctButtonRef.className = ButtonState.CORRECT;
                currentItem.answeredCorrectly = true;
                continue;
            }

            wrongGuesses.push(guess);
            guessButtonRef.className = ButtonState.WRONG;

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
                const guessButton = guessButtons[i];
                correctButton = guessButton;
                correctButtonRef = correctButton.ref.current!;
                await elements.blinkButton(correctButtonRef);
                currentItem.answeredCorrectly = true;
                break;
            }
        }
    }

    async function handleCorrectGuess() {
        //
        if (!correctButton) {
            throw new Error("correctButton is null.");
        }

        const wrongButtons = guessButtons.filter(
            (b) => b.target !== correctButton.target,
        );

        await elements.scaleIn(correctButton.target, {});
        await Promise.all(
            wrongButtons.map((b) => elements.fadeOut(b.target, {})),
        );
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
        if (!correctButtonRef) {
            throw new Error("correctButtonRef is null.");
        }

        if (award === 0) {
            return;
        }

        state.score = await elements.scoreUpdate(
            state.score,
            award,
            correctButtonRef,
        );

        if (state.score > state.best) {
            state.best = state.score;
            localStorage.setItem("bestScore", state.best.toString());
        }
        await time.delay();
    }

    async function unlockButtons() {
        const wrongButton: ButtonElement = guessButtons.find(
            (b) => b.ref.current!.className === ButtonState.WRONG,
        )!;

        await elements.scaleIn(wrongButton.target, {});
        await time.delay({ multiplier: 4 });
        elements.scaleOut(wrongButton.target, {});

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
