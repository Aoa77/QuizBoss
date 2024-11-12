import { Animation } from "../code/Animation";
import { ButtonStyle } from "../code/ButtonStyle";
import { EventName } from "../code/EventName";
import { AppContext } from "../app/context";
import { $time, $ease } from "../libs/anime-context/constants";
import { Task, TaskGroup } from "../libs/friendlies/Task";

export async function AskQuestion() {
    const { settings, state, flow } = AppContext.current(EventName.AskQuestion);
    const { guessButtonCount } = settings;
    const { buttonAnswerMap } = state;

    const progRef = Animation.QuizProgress;
    progRef.update({ opacity: 0, scale: 1 });

    const anims = TaskGroup.create();
    anims.add(() =>
        Animation.LoadingSpinner.run({
            scale: [1, 0],
            duration: $time.ticks(1.25),
            easing: $ease.linear,
        }),
    );
    anims.add(() =>
        Animation.QuestionImage.run({
            opacity: [0, 1],
            duration: $time.ticks(2),
            easing: $ease.linear,
        }),
    );

    anims.add(() =>
        Animation.QuestionText.run({
            opacity: [0, 1],
            delay: $time.ticks(1),
            duration: $time.ticks(2),
            easing: $ease.linear,
        }),
    );
    anims.add(() =>
        Animation.QuizProgress.run({
            opacity: [0, 1],
            delay: $time.ticks(1.5),
            duration: $time.ticks(2),
            easing: $ease.linear,
        }),
    );
    anims.add(() =>
        Animation.QuizProgress.run({
            scale: [1, 0],
            delay: $time.ticks(3),
            duration: $time.ticks(1),
        }),
    );

    await anims.all();
    // await Task.delay($time.ticks(2));

    for (let i = 0; i < guessButtonCount; i++) {
        anims.add(() =>
            Animation.GuessButton(i).run({
                opacity: [0, 1],
                delay: i * $time.ticks(0.4),
                duration: $time.ticks(0.125),
                easing: $ease.in.back,
            }),
        );
    }

    if (Animation.ScoreInfo.opacity !== 0.5) {
        anims.add(() =>
            Animation.ScoreInfo.run({
                opacity: [0, 0.5],
                duration: $time.ticks(1),
                easing: $ease.linear,
            }),
        );
    }
    await anims.all();

    buttonAnswerMap.forEach((item) => {
        item!.buttonStyle = ButtonStyle.normal;
    });
    await Task.delay($time.ticks(1));

    flow.dispatch((state) => ({ ...state, eventName: EventName.AwaitGuess }));
}
