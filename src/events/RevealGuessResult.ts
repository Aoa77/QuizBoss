import { Duration } from "../libs/anime-context/AnimeContext.constants";
import { FlowContext } from "../libs/flow-context/FlowContext";
import { Anime } from "../models/Anime";
import { ButtonStyle } from "../models/ButtonStyle";
import { EventName } from "../models/EventName";
import { QuizState } from "../models/QuizState";

export async function RevealGuessResult() {
    const [state, setState] = FlowContext.current<QuizState>();

    const duration = Duration.oneSecond;
    await Anime.GuessButton(state.guessButtonIndex).run({
        scale: 1.3,
        delay: 0.25 * duration,
        duration,
        easing: "easeOutElastic(3, 1)",
    });

    let correctGuess = false;
    state.buttonAnswerMap.forEach((_item) => {
        if (correctGuess) {
            return;
        }
        const item = _item!;
        switch (item.buttonStyle) {
            case ButtonStyle.correct:
                correctGuess = true;
                item.buttonStyle = ButtonStyle.disabled;
                return;
            case ButtonStyle.wrong:
                item.buttonStyle = ButtonStyle.disabled;
                return;
            case ButtonStyle.dimmed:
                item.buttonStyle = ButtonStyle.normal;
                return;
        }
    });

    if (correctGuess) {
        setState({ ...state, eventName: EventName.ConcludeCorrectGuess });
        return;
    }

    await Anime.GuessButton(state.guessButtonIndex).run({
        scale: 1,
        delay: 0.25 * duration,
        duration,
        easing: "easeOutElastic(3, 1)",
    });

    setState({ ...state, eventName: EventName.AwaitGuess });
}
