import { AppContext } from "../app/context";
import { Animation } from "../code/Animation";
import { EventName } from "../code/EventName";
import { $ease, $time } from "../libs/anime-context/constants";
import { TaskGroup } from "../libs/friendlies/Task";

export async function ConcludeQuestion() {
    const { flow } = AppContext.current(EventName.ConcludeQuestion);

    const anims = TaskGroup.create();
    anims.add(() =>
        Animation.QuestionImage.run({
            opacity: [1, 0],
            duration: $time.ticks(1.25),
            easing: $ease.linear,
        }),
    );
    anims.add(() =>
        Animation.LoadingSpinner.run({
            opacity: [0, 1],
            duration: $time.ticks(2),
            easing: $ease.linear,
        }),
    );
    await anims.all();
    flow.dispatch((state) => ({ ...state, eventName: EventName.PrepQuestion }));
}
