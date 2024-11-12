import { Animation } from "../code/Animation";
import { ButtonStyle } from "../code/ButtonStyle";
import { EventName } from "../code/EventName";
import { AppContext } from "../app/context";
import { $time, $ease } from "../libs/anime-context/AnimeConstants";
import { Task, TaskGroup } from "../libs/friendlies/Task";

export async function AskQuestion() {
    const { settings, state, flow } = AppContext.current(EventName.AskQuestion);
    const { guessButtonCount } = settings;
    const { buttonAnswerMap, /*currentItemIndex*/ } = state;

    // const lastImage = Anime.QuestionImage.element!.firstChild;
    // if (lastImage) {
    //     document.getElementById("preload")!.appendChild(lastImage);
    // }
    // const img = document.getElementById(`preload-image-${currentItemIndex}`);
    // img?.removeAttribute("width");
    // Anime.QuestionImage.element!.appendChild(img!);

    const anims = TaskGroup.create();
    anims.add(() =>
        Animation.LoadingSpinner.run({
            opacity: [1, 0],
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
    // anims.add(() =>
    //     Anime.QuizProgress.run({
    //         opacity: [1.0, 0.5],
    //         scale: [1.25, 1.0],
    //         delay: $time.ticks(1.5),
    //         duration: $time.ticks(1),
    //         easing: $ease.linear,
    //     }),
    // );

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
