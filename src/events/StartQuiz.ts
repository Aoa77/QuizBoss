import { Duration, Ease, Fade } from "../libs/anime-context/AnimeContext.constants";
import { FlowContext } from "../libs/flow-context/FlowContext";
import { TaskGroup } from "../libs/friendlies/Task";
import { Anime } from "../models/Anime";
import { EventName } from "../models/EventName";
import { QuizState } from "../models/QuizState";

export async function StartQuiz() {
    //
    const duration = Duration.oneSecond;
    const anims = TaskGroup.create();
    anims.add(
        Anime.LoadingProgress.run({
            opacity: Fade.out,
            delay: 0.2 * duration,
            duration,
            easing: Ease.linear,
        }),
    );
    anims.add(
        Anime.QuizTitle.run({
            opacity: Fade.in,
            delay: 0.5 * duration,
            duration,
            easing: Ease.linear,
        }),
    );
    anims.add(
        Anime.LoadingSpinner.run({
            opacity: Fade.in,
            delay: 0.75 * duration,
            duration,
            easing: Ease.linear,
        }),
    );
    await anims.all();

    //
    const [state, setState] = FlowContext.current<QuizState>();
    setState({ ...state, eventName: EventName.PrepQuestion });
}
