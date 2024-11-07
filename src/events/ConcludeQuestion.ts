import { Ease, Fade } from "../libs/anime-context/AnimeContext.constants";
import { TaskGroup } from "../libs/friendlies/Task";
import { assertFlowEvent, EventName } from "../models/EventName";
import { QuizState } from "../models/QuizState";
import { Anime } from "../models/Anime";
import { FlowContext } from "../libs/flow-context/FlowContext";

export async function ConcludeQuestion() {
    assertFlowEvent(EventName.ConcludeQuestion);
    const [state, setState] = FlowContext.current<QuizState>();
    const { settings } = state;
    const { oneTickAtSpeed } = settings;

    const duration = 0.25 * oneTickAtSpeed;
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

    setState((state) => ({ ...state, eventName: EventName.PrepQuestion }));
}
