import { Duration, Ease, Fade } from "../libs/anime-context/AnimeContext.constants";
import { FlowContext } from "../libs/flow-context/FlowContext";
import { TaskGroup } from "../libs/friendlies/Task";
import { EventName } from "../models/EventName";
import { QuizState } from "../models/QuizState";
import { Anime } from "../models/Anime";

export async function ConcludeQuestion() {
    const [state, setState] = FlowContext.current<QuizState>();

    const duration = Duration.oneSecond;
    const anims = TaskGroup.create();
    anims.add(
        Anime.QuestionImage.run({
            opacity: Fade.out,
            delay: 0,
            duration,
            easing: Ease.linear,
        }),
    );
    anims.add(
        Anime.LoadingSpinner.run({
            opacity: Fade.in,
            delay: 0.45 * duration,
            duration,
            easing: Ease.linear,
        }),
    );
    await anims.all();

    setState({ ...state, eventName: EventName.PrepQuestion });
}
