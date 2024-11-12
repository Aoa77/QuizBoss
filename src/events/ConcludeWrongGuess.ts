import { AppContext } from "../app/context";
import { Animation } from "../code/Animation";
import { ButtonStyle } from "../code/ButtonStyle";
import { EventName } from "../code/EventName";
import { $ease, $time } from "../libs/anime-context/constants";

export async function ConcludeWrongGuess() {
    const { state, flow } = AppContext.current(EventName.ConcludeWrongGuess);
    const { buttonAnswerMap, guessButtonIndex } = state;

    const buttonRef = Animation.GuessButton(guessButtonIndex);
    await buttonRef.run({
        scale: [1.3, 1.0],
        delay: $time.ticks(1.05),
        duration: $time.ticks(1),
        easing: $ease.out.elastic(3, 1),
    });

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
