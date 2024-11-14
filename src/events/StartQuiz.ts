import { AppContext } from "../game/context";
import { Anim } from "../animations";
import { AppEvent } from "../game/events";
import { $ease, $time } from "../libs/anime-context/constants";
import { TaskGroup } from "../libs/friendlies/Task";

export async function StartQuiz() {
    const { flow } = AppContext.current(AppEvent.StartQuiz);

    ///
    const anims = TaskGroup.create();
    anims.add(() =>
        Anim.QuizTitle.run({
            opacity: [0, 1],
            delay: $time.ticks(2),
            duration: $time.ticks(4),
            easing: $ease.linear,
        }),
    );
    anims.add(() =>
        Anim.AppTitle.run({
            opacity: [1, 0],
            duration: $time.ticks(2),
            easing: $ease.linear,
        }),
    );
    anims.add(() =>
        Anim.AppVersion.run({
            opacity: 0,
            duration: $time.ticks(2),
            easing: $ease.linear,
        }),
    );
    anims.add(() =>
        Anim.LoadingSpinner.immediate({ opacity: 0, scale: 1 }).run({
            opacity: [0, 1],
            delay: $time.ticks(2),
            duration: $time.ticks(2),
            easing: $ease.linear,
        }),
    );
    await anims.all();

    //
    flow.dispatch((state) => ({ ...state, eventName: AppEvent.PrepQuestion }));
}
