import { $ease, $time } from "../libs/anime-context/AnimeContext.constants";
import { TaskGroup } from "../libs/friendlies/Task";
import { assertFlowEvent, EventName } from "../models/EventName";
import { QuizState } from "../models/QuizState";
import { Anime } from "../models/Anime";
import { FlowContext } from "../libs/flow-context/FlowContext";

export async function ConcludeQuestion() {
    assertFlowEvent(EventName.ConcludeQuestion);
    const [, setState] = FlowContext.current<QuizState>();

    const anims = TaskGroup.create();
    anims.add(
        Anime.QuestionImage.run({
            opacity: [1, 0],
            delay: 0,
            duration: $time.ticks(0.25),
            easing: $ease.linear,
        }),
    );
    anims.add(
        Anime.LoadingSpinner.run({
            opacity: [0, 1],
            delay: $time.ticks(0.125),
            duration: $time.ticks(0.25),
            easing: $ease.linear,
        }),
    );
    await anims.all();
    setState((state) => ({ ...state, eventName: EventName.PrepQuestion }));
}
