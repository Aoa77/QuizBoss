import { AppContext } from "../app/App.context";
import { Anime } from "../code/Anime";
import { EventName } from "../code/EventName";
import { $ease, $time } from "../libs/anime-context/AnimeConstants";
import { TaskGroup } from "../libs/friendlies/Task";

export async function ConcludeQuestion() {
    const { flow } = AppContext.current(EventName.ConcludeQuestion);

    const anims = TaskGroup.create();
    anims.add(() =>
        Anime.QuestionImage.run({
            opacity: [1, 0],
            delay: 0,
            duration: $time.ticks(0.25),
            easing: $ease.linear,
        }),
    );
    anims.add(() =>
        Anime.LoadingSpinner.run({
            opacity: [0, 1],
            delay: $time.ticks(0.125),
            duration: $time.ticks(0.25),
            easing: $ease.linear,
        }),
    );
    await anims.all();
    flow.dispatch((state) => ({ ...state, eventName: EventName.PrepQuestion }));
}
