import { AppContext } from "../app/App.context";
import { Anime } from "../code/Anime";
import { ButtonStyle } from "../code/ButtonStyle";
import { EventName } from "../code/EventName";
import { $ease, $time } from "../libs/anime-context/AnimeContext.constants";

export async function ConcludeWrongGuess() {
    const { state, flow } = AppContext.current(EventName.ConcludeWrongGuess);
    const { buttonAnswerMap, guessButtonIndex } = state;

    const buttonRef = Anime.GuessButton(guessButtonIndex);
    await buttonRef.run({
        scale: buttonRef.scaleDown,
        delay: $time.ticks(1.05),
        duration: $time.tick,
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
