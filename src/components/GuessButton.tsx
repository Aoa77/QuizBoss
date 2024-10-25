import { GuessButtonConfig } from "./GuessButton.config";

/////////////////////////////////////////////
export function GuessButton(config: GuessButtonConfig) {
    return (
        <span
            id={config.id}
            key={config.id}
            ref={config.ref}
            style={config.style}>
        </span>
    );
}

