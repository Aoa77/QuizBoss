import { useRef } from "react";


export const GuessButtonCount: number = 4;
export enum GuessButtonState {
    NORMAL = "normal",
    DIMMED = "dimmed",
    CORRECT = "correct",
    WRONG = "wrong"
}

export interface GuessButton {
    element: JSX.Element;
    ref: React.RefObject<HTMLButtonElement>;
}

export function useGuessButtons(
    onPointerDown: (ref: React.RefObject<HTMLButtonElement>) => void
): GuessButton[] {
    const buttons: GuessButton[] = [];
    for (let i = 0; i < GuessButtonCount; i++) {
        buttons.push(GuessButtonFactory(i, onPointerDown));
    }
    return buttons;
}
function GuessButtonFactory(
    index: number,
    onPointerDown: (ref: React.RefObject<HTMLButtonElement>) => void
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
            ></button>
        ),
        ref,
    };
}
