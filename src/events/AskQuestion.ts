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
            Anim.QuestionText.run({
                opacity: [0, 1],
                delay: $time.ticks(2),
                duration: $time.ticks(1.25),
                easing: $ease.linear,
            }),
        () =>
            Anim.QuestionText.run({
                // scale: [1, 1.3],
                delay: $time.ticks(2),
                duration: $time.ticks(0.25),
            }),
    );

    // anims.add(() =>
    //     Anim.QuizProgress.run({
    //         opacity: [0, 1],
    //         delay: $time.ticks(1.5),
    //         duration: $time.ticks(2),
    //         easing: $ease.linear,
    //     }),
    // );


    // for (let i = 0; i < guessButtonCount; i++) {
    //     anims.add(() =>
    //         Anim.GuessButton(i).run({
    //             opacity: [0, 1],
    //             delay: i * $time.ticks(0.4),
    //             duration: $time.ticks(0.125),
    //             easing: $ease.in.back,
    //         }),
    //     );
    // }

    // if (Anim.ScoreInfo.opacity !== 0.5) {
    //     anims.add(() =>
    //         Anim.ScoreInfo.run({
    //             opacity: [0, 0.5],
    //             duration: $time.ticks(1),
    //             easing: $ease.linear,
    //         }),
    //     );
    //}

    buttonAnswerMap.forEach((item) => {
        item!.buttonStyle = ButtonStyle.normal;
    });
    await Task.delay($time.ticks(10000));

    flow.dispatch((state) => ({ ...state, eventName: EventName.AwaitGuess }));
}
