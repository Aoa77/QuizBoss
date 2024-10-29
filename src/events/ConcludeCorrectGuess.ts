import { Duration, Scale } from "../libs/anime-context/AnimeContext.constants";
import { FlowContext } from "../libs/flow-context/FlowContext";
import { TaskGroup } from "../libs/friendlies/Task";
import { Anime } from "../models/Anime";
import { EventName } from "../models/EventName";
import { QuizState } from "../models/QuizState";

export async function ConcludeCorrectGuess() {
    ///
    const [state, setState] = FlowContext.current<QuizState>();

    ///
    const duration = Duration.oneSecond;
    const anims = TaskGroup.create();
    state.buttonAnswerMap.forEach((_, bidx) => {
        if (bidx === state.guessButtonIndex) {
            return;
        }
        anims.add(
            Anime.GuessButton(bidx).run({
                scale: Scale.zero,
                delay: 0.25 * duration,
                duration,
                easing: "easeOutElastic(3, 1)",
            }),
        );
    });

    await anims.all();
    await Anime.GuessButton(state.guessButtonIndex).run({
        scale: Scale.zero,
        delay: 0.25 * duration,
        duration,
        easing: "easeOutElastic(3, 0.75)",
    });

    ///
    setState({ ...state, eventName: EventName.AwaitGuess });
}
