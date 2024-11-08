import { $ease, $time } from "../libs/anime-context/AnimeContext.constants";
import { Anime } from "../code/Anime";
import { ButtonStyle } from "../code/ButtonStyle";
import { assertFlowEvent, EventName } from "../code/EventName";
import { QuizState } from "../code/QuizState";
import { FlowContext } from "../libs/flow-context/FlowContext";

export async function ConcludeWrongGuess() {
    assertFlowEvent(EventName.ConcludeWrongGuess);
    const [state, setState] = FlowContext.current<QuizState>();
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

    setState((state) => ({ ...state, eventName: EventName.AwaitGuess }));
}
