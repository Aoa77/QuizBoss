import { Duration, Fade, Scale } from "../libs/anime-context/AnimeContext.constants";
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
        const button = Anime.GuessButton(bidx);
        anims.add(
            button
                .run({
                    scale: Scale.zero,
                    delay: 0.25 * duration,
                    duration,
                    easing: "easeOutElastic(3, 1)",
                })
                .then(() => {
                    button.opacity = Fade.out;
                    button.scale = Scale.one;
                }),
        );
    });

    await anims.all();
    
    const button = Anime.GuessButton(state.guessButtonIndex);
    await button
        .run({
            scale: Scale.zero,
            delay: 0.25 * duration,
            duration,
            easing: "easeOutElastic(3, 0.75)",
        })
        .then(() => {
            button.opacity = Fade.out;
            button.scale = Scale.one;
        });

    ///
    setState({ ...state, eventName: EventName.AwaitGuess });
}
