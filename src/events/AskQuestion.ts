import { Anim } from "../code/Animation";
import { ButtonState } from "../code/ButtonStyle";
import { EventName } from "../code/EventName";
import { AppContext } from "../app/context";
import { $time, $ease } from "../libs/anime-context/constants";
import { Task } from "../libs/friendlies/Task";

export async function AskQuestion() {
    const { settings, state, flow } = AppContext.current(EventName.AskQuestion);
    const { guessButtonCount } = settings;
    const { buttonAnswerMap } = state;

    await fadeInScoreAndProgress();

    await Anim.LoadingSpinner.run({
        opacity: [1, 0],
        duration: $time.ticks(2),
        easing: $ease.linear,
    });

    await Anim.QuestionImage.immediate({ opacity: 1, scale: 0 }) /////
        .run({
            scale: [0, 1],
            duration: $time.ticks(1),
            endDelay: $time.ticks(1),
        });

    await Anim.QuestionText.immediate({ opacity: 1, scale: 0 }).run({
        scale: [0, 1],
        duration: $time.ticks(1),
        endDelay: $time.ticks(4),
    });

    Anim.QuestionText.run({
        opacity: [1, 0],
        duration: $time.ticks(1),
        easing: $ease.linear,
    });

    for (let i = 0; i < guessButtonCount; i++) {
        await Anim.GuessButton(i)
            .immediate({ opacity: 1, scale: 0 })
            .run({
                scale: [0, 1],
                duration: $time.ticks(0.25),
                endDelay: $time.ticks(0.25),
            });
    }

    buttonAnswerMap.forEach((item) => {
        item!.buttonStyle = ButtonState.normal;
    });

    flow.dispatch((state) => ({ ...state, eventName: EventName.AwaitGuess }));
}

async function fadeInScoreAndProgress() {
    if (Anim.ScoreInfo.opacity === 0.5) {
        return;
    }
    await Task.all(
        () =>
            Anim.ScoreInfo.run({
                opacity: [0, 0.5],
                duration: $time.ticks(2),
                easing: $ease.linear,
            }),
        () =>
            Anim.QuizProgress.run({
                opacity: [0, 0.25],
                duration: $time.ticks(2),
                easing: $ease.linear,
            }),
    );
}
