import { AppContext } from "../app/context";
import { Anim } from "../code/Animation";
import { ButtonStyle } from "../code/ButtonStyle";
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
            case ButtonStyle.wrong:
                item.buttonStyle = ButtonStyle.disabled;
                return;
            case ButtonStyle.dimmed:
                item.buttonStyle = ButtonStyle.normal;
                return;
        }
    });

    flow.dispatch((state) => ({ ...state, eventName: EventName.AwaitGuess }));
}

