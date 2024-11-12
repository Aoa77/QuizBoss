import { Anim } from "../code/Animation";
import { ButtonStyle } from "../code/ButtonStyle";
import { EventName } from "../code/EventName";
import { AppContext } from "../app/context";
import { $time, $ease } from "../libs/anime-context/constants";
import { Task, TaskGroup } from "../libs/friendlies/Task";

export async function AskQuestion() {
    const { settings, state, flow } = AppContext.current(EventName.AskQuestion);
    const { guessButtonCount } = settings;
    const { buttonAnswerMap } = state;

    await Task.all(
        () =>
            Anim.LoadingSpinner.run({
                opacity: [1, 0],
                duration: $time.ticks(0.25),
                easing: $ease.linear,
            }),
        () =>
            Anim.QuestionImage.run({
                opacity: [0, 1],
                duration: $time.ticks(2),
                easing: $ease.linear,
            }),
        () =>
            Anim.QuestionText.immediate({ opacity: 1, scale: 0 }).run({
                scale: [0, 1],
                delay: $time.ticks(2),
                duration: $time.ticks(0.5),
            }),
        () =>
            Anim.QuizProgress.immediate({ opacity: 1, scale: 0 }).run({
                scale: [0, 1],
                delay: $time.ticks(3),
                duration: $time.ticks(0.5),
            }),
    );

    const anims = TaskGroup.create(
        () =>
            Anim.QuestionText.run({
                opacity: [1, 0],
                duration: $time.ticks(3.25),
                easing: $ease.linear,
            }),

        () =>
            Anim.QuizProgress.run({
                opacity: [1, 0],
                duration: $time.ticks(3.25),
                easing: $ease.linear,
            }),
    );

    for (let i = 0; i < guessButtonCount; i++) {
        anims.add(() =>
            Anim.GuessButton(i)
                .immediate({ opacity: 0, scale: 1 })
                .run({
                    opacity: [0, 1],
                    delay: i * $time.ticks(0.4),
                    duration: $time.ticks(0.125),
                    easing: $ease.in.back,
                }),
        );
    }

    if (Anim.ScoreInfo.opacity !== 0.5) {
        anims.add(() =>
            Anim.ScoreInfo.run({
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
    // await Task.delay($time.ticks(1));

    flow.dispatch((state) => ({ ...state, eventName: EventName.AwaitGuess }));
}
