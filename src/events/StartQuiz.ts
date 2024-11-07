import { Ease, Fade } from "../libs/anime-context/AnimeContext.constants";
import { TaskGroup } from "../libs/friendlies/Task";
import { Anime } from "../models/Anime";
import { assertFlowEvent, EventName } from "../models/EventName";
import { QuizState } from "../models/QuizState";
import { FlowContext } from "../libs/flow-context/FlowContext";

export async function StartQuiz() {
    assertFlowEvent(EventName.StartQuiz);
    const [state, setState] = FlowContext.current<QuizState>();
    const { settings } = state;
    const { oneTickAtSpeed } = settings;

    ///
    const duration = oneTickAtSpeed;
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
    setState((state) => ({ ...state, eventName: EventName.PrepQuestion }));
}
