import { AppContext } from "../code/AppContext";
import { Anim } from "../code/AnimationManager";
import { AppEvent } from "../code/AppEvent";
import { ButtonState } from "../code/ButtonState";
import { concludeButtonReveal } from "./animations/concludeButtonReveal";

export async function ConcludeWrongGuess() {
    const { state, flow } = AppContext.current(AppEvent.ConcludeWrongGuess);
    const { buttonAnswerMap, guessButtonIndex } = state;

    const buttonRef = Anim.GuessButton(guessButtonIndex);
    await concludeButtonReveal({ buttonRef, delayTicks: 2 });

    buttonAnswerMap.forEach((_item) => {
        const item = _item!;
        switch (item.buttonStyle) {
            case ButtonState.wrong:
                item.buttonStyle = ButtonState.disabled;
                return;
            case ButtonState.dimmed:
                item.buttonStyle = ButtonState.normal;
                return;
        }
    });

    flow.dispatch((state) => ({ ...state, eventName: AppEvent.AwaitGuess }));
}
