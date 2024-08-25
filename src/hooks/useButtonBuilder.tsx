import { Config } from "../context/Config";
import { GameState } from "../context/GameState";
import { GuessButton } from "../context/GuessButton";
import { GuessButtonState } from "../context/GuessButtonState";
import { useRef } from "react";

export function useButtonBuilder(
    config: Config,
    gameState: GameState,
    setGameState: (gameState: GameState) => void,
    setGuessValue: (guessValue: string) => void,
): GuessButton[] {
    ///
    const { guessButtonCount } = config;

    const onPointerDown: (ref: React.RefObject<HTMLButtonElement>) => void = (
        clickedButtonRef,
    ) => {
        if (gameState !== GameState.INPUT) {
            return;
        }
        const clickedButton = clickedButtonRef.current!;
        if (clickedButton.className !== GuessButtonState.NORMAL) {
            return;
        }
        setGuessValue(clickedButton.value);
        setGameState(GameState.RESULT);
    };

    const buttons: GuessButton[] = [];
    for (let i = 0; i < guessButtonCount; i++) {
        buttons.push(NewButtonElement(i, onPointerDown));
    }
    return buttons;
}

function NewButtonElement(
    index: number,
    onPointerDown: (ref: React.RefObject<HTMLButtonElement>) => void,
): GuessButton {
    const ref = useRef(null);
    const key = "button" + index;
    return {
        element: (
            <button
                className={GuessButtonState.NORMAL}
                id={key}
                key={key}
                onPointerDown={() => onPointerDown(ref)}
                ref={ref}
                value={key}
            >
                {key}
            </button>
        ),
        ref,
    };
}
