import { AppContext } from "../app/context";
import { Animation } from "../code/Animation";
import { EventName } from "../code/EventName";
import { $ease, $time } from "../libs/anime-context/AnimeConstants";
import { TaskGroup } from "../libs/friendlies/Task";

export async function StartQuiz() {
    const { flow } = AppContext.current(EventName.StartQuiz);

    ///
    const anims = TaskGroup.create();
    anims.add(() =>
        Animation.QuizTitle.run({
            opacity: [0, 1],
            delay: $time.ticks(0.5),
            duration: $time.ticks(1),
            easing: $ease.linear,
        }),
    );
    anims.add(() =>
        Animation.LoadingMessage.run({
            opacity: [1, 0],
            delay: $time.ticks(0.5),
            duration: $time.ticks(1),
            easing: $ease.linear,
        }),
    );
    await anims.all();

    //
    flow.dispatch((state) => ({ ...state, eventName: EventName.PrepQuestion }));
}
