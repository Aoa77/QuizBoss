import { useRef } from "react";
import ButtonElement from "./ButtonElement";
import { ButtonState } from "./ButtonState";

export default function ButtonElementRef(
    index: number,
    onPointerDown: (ref: React.RefObject<HTMLButtonElement>) => void,
): ButtonElement {
    const ref = useRef(null);
    const key = "button" + index;
    return {
        target: key,
        element: (
            <button
                className={ButtonState.HIDDEN}
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
