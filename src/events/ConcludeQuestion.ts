import { AppContext } from "../app/context";
import { Anim } from "../code/animation";
import { EventName } from "../code/game";
import { $ease, $time } from "../libs/anime-context/constants";
import { TaskGroup } from "../libs/friendlies/Task";

export async function ConcludeQuestion() {
    const { flow } = AppContext.current(EventName.ConcludeQuestion);

    const anims = TaskGroup.create();
    anims.add(() =>
        Anim.QuestionImage.run({
            opacity: [1, 0],
            duration: $time.ticks(2),
            easing: $ease.linear,
        }),
    );
    anims.add(() =>
        Anim.LoadingSpinner.run({
            opacity: [0, 1],
            delay: $time.ticks(2),
            duration: $time.ticks(2),
            easing: $ease.linear,
        }),
    );
    await anims.all();
    flow.dispatch((state) => ({ ...state, eventName: EventName.PrepQuestion }));
}
