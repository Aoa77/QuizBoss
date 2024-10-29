import { Ease, Scale } from "../libs/anime-context/AnimeContext.constants";
import { FlowContext } from "../libs/flow-context/FlowContext";
import { Anime } from "../models/Anime";
import { ButtonStyle } from "../models/ButtonStyle";
import { EventName } from "../models/EventName";
import { QuizState } from "../models/QuizState";

export async function ConcludeWrongGuess() {
    const [state, setState] = FlowContext.current<QuizState>();
    const { buttonAnswerMap, guessButtonIndex, settings } = state;
    const { oneTickAtSpeed } = settings;

    const duration = oneTickAtSpeed;
    await Anime.GuessButton(guessButtonIndex).run({
        scale: Scale.one,
        delay: 1.05 * duration,
        duration,
        easing: Ease.out.elastic(3, 1),
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

    if (state.itemScore === 0) {
        state.guessButtonIndex = state.correctAnswerButtonIndex;
        const button = buttonAnswerMap[state.guessButtonIndex]!;
        button.buttonStyle = ButtonStyle.reveal;
        setState({ ...state, eventName: EventName.RevealGuessResult });
        return;
    }
    setState({ ...state, eventName: EventName.AwaitGuess });
}
