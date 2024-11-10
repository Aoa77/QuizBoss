import { AppContext } from "../app/App.context";
import { Anime } from "../code/Anime";
import { EventName } from "../code/EventName";
import { $ease, $time } from "../libs/anime-context/AnimeContext.constants";
import { TaskGroup } from "../libs/friendlies/Task";

export async function StartQuiz() {
    const { flow } = AppContext.current(EventName.StartQuiz);

    ///
    const anims = TaskGroup.create();
    anims.add(() =>
        Anime.LoadingProgress.run({
            opacity: [1, 0],
            delay: $time.ticks(0.25),
            duration: $time.tick,
            easing: $ease.linear,
        }),
    );
    anims.add(() =>
        Anime.QuizTitle.run({
            opacity: [0, 1],
            delay: $time.ticks(0.5),
            duration: $time.tick,
            easing: $ease.linear,
        }),
    );
    anims.add(() =>
        Anime.LoadingSpinner.run({
            opacity: [0, 1],
            delay: $time.ticks(0.75),
            duration: $time.tick,
            easing: $ease.linear,
        }),
    );
    await anims.all();

    //
    flow.dispatch((state) => ({ ...state, eventName: EventName.PrepQuestion }));
}
