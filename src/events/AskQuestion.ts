import { $time, $ease } from "../libs/anime-context/AnimeContext.constants";
import { FlowContext } from "../libs/flow-context/FlowContext";
import { Task, TaskGroup } from "../libs/friendlies/Task";
import { Anime } from "../code/Anime";
import { ButtonStyle } from "../code/ButtonStyle";
import { assertFlowEvent, EventName } from "../code/EventName";
import { AppState } from "../app/App.state";

export async function AskQuestion() {
    assertFlowEvent(EventName.AskQuestion);
    const [state, setState] = FlowContext.current<AppState>();
    const { settings, buttonAnswerMap } = state;
    const { guessButtonCount } = settings;

    const anims = TaskGroup.create();
    anims.add(()=>
        Anime.LoadingSpinner.run({
            opacity: [1, 0],
            duration: $time.ticks(1.25),
            easing: $ease.linear,
        }),
    );
    anims.add(()=>
        Anime.QuestionImage.run({
            opacity: [0, 1],
            duration: $time.ticks(2),
            easing: $ease.linear,
        }),
    );


    anims.add(()=>
        Anime.QuestionText.run({
            opacity: [0, 1],
            delay: $time.ticks(1),
            duration: $time.ticks(2),
            easing: $ease.linear,
        }),
    );
    anims.add(()=>
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
        anims.add(()=>
            Anime.GuessButton(i).run({
                opacity: [0, 1],
                delay: i * $time.ticks(0.4),
                duration: $time.ticks(0.125),
                easing: $ease.in.back,
            }),
        );
    }

    if (Anime.ScoreInfo.opacity !== 0.5) {
        anims.add(()=>
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

    setState((state) => ({ ...state, eventName: EventName.AwaitGuess }));
}
