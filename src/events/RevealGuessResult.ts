import { Ease } from "../libs/anime-context/AnimeContext.constants";
import { FlowContext } from "../libs/flow-context/FlowContext";
import { Anime } from "../models/Anime";
import { ButtonStyle } from "../models/ButtonStyle";
import { EventName } from "../models/EventName";
import { QuizState } from "../models/QuizState";

export async function RevealGuessResult() {
    const [state, setState] = FlowContext.current<QuizState>();
    const { guessButtonIndex, settings, buttonAnswerMap } = state;
    const button = buttonAnswerMap[guessButtonIndex]!;
    const { oneTickAtSpeed } = settings;

    const duration = oneTickAtSpeed;
    await Anime.GuessButton(guessButtonIndex).run({
        scale: 1.3,
        delay: 0,
        duration: 0.25 * duration,
        endDelay: duration,
        easing: Ease.out.elastic(3, 1),
    });

    if (button.buttonStyle === ButtonStyle.wrong) {
        setState({ ...state, eventName: EventName.ConcludeWrongGuess });
        return;
    }
    
    setState({ ...state, eventName: EventName.ConcludeFinalGuess });
}
