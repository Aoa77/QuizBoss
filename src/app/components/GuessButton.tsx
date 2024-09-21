import { useXref } from "../../core/hooks/useXref";
import pushGuessButton from "../functions/pushGuessButton";
import { ButtonState } from "../models/ButtonState";
import { ElementNames } from "../elements/ElementNames";

export default function GuessButton(params: { index: number }) {
    const [button] = useXref<HTMLButtonElement>({
        id: ElementNames.button,
        index: params.index,
    });

    return (
        <button
            className={ButtonState.HIDDEN}
            id={button.id}
            key={button.id}
            onPointerDown={() => pushGuessButton(button)}
            ref={button.ref}
            value={button.id}>
            {button.id}
        </button>
    );
}
