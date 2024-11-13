import { AppContext } from "../app/context";
import { Anim } from "../code/Animation";
import { ButtonState } from "../code/ButtonStyle";
import { EventName } from "../code/EventName";
import { ConcludeButtonReveal } from "./ConcludeButtonReveal";

export async function ConcludeWrongGuess() {
    const { state, flow } = AppContext.current(EventName.ConcludeWrongGuess);
    const { buttonAnswerMap, guessButtonIndex } = state;

    const buttonRef = Anim.GuessButton(guessButtonIndex);
    await ConcludeButtonReveal(buttonRef, 4);

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

    flow.dispatch((state) => ({ ...state, eventName: EventName.AwaitGuess }));
}

