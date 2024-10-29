import { GuessButtons } from "../components/GuessButtons";
import { Duration } from "../libs/anime-context/AnimeContext.constants";
import { FlowContext } from "../libs/flow-context/FlowContext";
import { TaskGroup } from "../libs/friendlies/Task";
import { EventName } from "../models/EventName";
import { QuizState } from "../models/QuizState";

export async function ConcludeCorrectGuess() {
    ///
    const [state, setState] = FlowContext.current<QuizState>();
    const animations = GuessButtons.animations;

    ///
    const duration = Duration.oneSecond;
    const banims = TaskGroup.create();
    animations.forEach((anim, bidx) => {
        if (bidx === state.guessButtonIndex) {
            return;
        }
        banims.add(
            anim.zoomZero({
                delay: 125 * bidx, ///////////
                duration,
                enable: true,
            }),
        );
    });
    await banims.all();
    await animations[state.guessButtonIndex].zoomZero({
        delay: 0.25 * duration,
        duration,
        enable: true,
    });

    ///
    setState({ ...state, eventName: EventName.AwaitGuess });
}
