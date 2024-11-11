import { Anime } from "../code/Anime";
import { ButtonStyle } from "../code/ButtonStyle";
import { EventName } from "../code/EventName";
import { AppContext } from "../app/App.context";
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
        Anime.LoadingSpinner.run({
            opacity: [1, 0],
            duration: $time.ticks(1.25),
            easing: $ease.linear,
        }),
    );
    anims.add(() =>
        Anime.QuestionImage.run({
            opacity: [0, 1],
            duration: $time.ticks(2),
            easing: $ease.linear,
        }),
    );

    anims.add(() =>
        Anime.QuestionText.run({
            opacity: [0, 1],
            delay: $time.ticks(1),
            duration: $time.ticks(2),
            easing: $ease.linear,
        }),
    );
    anims.add(() =>
        Anime.QuizProgress.run({
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
    //         duration: $time.tick,
    //         easing: $ease.linear,
    //     }),
    // );

    await anims.all();
    // await Task.delay($time.ticks(2));

    for (let i = 0; i < guessButtonCount; i++) {
        anims.add(() =>
            Anime.GuessButton(i).run({
                opacity: [0, 1],
                delay: i * $time.ticks(0.4),
                duration: $time.ticks(0.125),
                easing: $ease.in.back,
            }),
        );
    }

    if (Anime.ScoreInfo.opacity !== 0.5) {
        anims.add(() =>
            Anime.ScoreInfo.run({
                opacity: [0, 0.5],
                duration: $time.tick,
                easing: $ease.linear,
            }),
        );
    }
    await anims.all();

    buttonAnswerMap.forEach((item) => {
        item!.buttonStyle = ButtonStyle.normal;
    });
    await Task.delay($time.tick);

    flow.dispatch((state) => ({ ...state, eventName: EventName.AwaitGuess }));
}
