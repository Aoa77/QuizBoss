import { $ease, $time } from "../libs/anime-context/AnimeContext.constants";
import { TaskGroup } from "../libs/friendlies/Task";
import { Anime } from "../code/Anime";
import { assertFlowEvent, EventName } from "../code/EventName";
import { AppState } from "../app/App.state";
import { FlowContext } from "../libs/flow-context/FlowContext";

export async function StartQuiz() {
    assertFlowEvent(EventName.StartQuiz);
    const [, setState] = FlowContext.current<AppState>();

    ///
    const anims = TaskGroup.create();
    anims.add(
        Anime.LoadingProgress.run({
            opacity: [1, 0],
            delay: $time.ticks(0.25),
            duration: $time.tick,
            easing: $ease.linear,
        }),
    );
    anims.add(
        Anime.QuizTitle.run({
            opacity: [0, 1],
            delay: $time.ticks(0.5),
            duration: $time.tick,
            easing: $ease.linear,
        }),
    );
    anims.add(
        Anime.LoadingSpinner.run({
            opacity: [0, 1],
            delay: $time.ticks(0.75),
            duration: $time.tick,
            easing: $ease.linear,
        }),
    );
    await anims.all();

    //
    setState((state) => ({ ...state, eventName: EventName.PrepQuestion }));
}
