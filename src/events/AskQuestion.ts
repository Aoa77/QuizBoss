import { Ease, Fade, Scale } from "../libs/anime-context/AnimeContext.constants";
import { FlowContext } from "../libs/flow-context/FlowContext";
import { Task, TaskGroup } from "../libs/friendlies/Task";
import { Anime } from "../models/Anime";
import { ButtonStyle } from "../models/ButtonStyle";
import { EventName } from "../models/EventName";
import { QuizState } from "../models/QuizState";

export async function handleAskQuestion() {
    const [state, setState] = FlowContext.current<QuizState>();
    const { settings } = state;
    const { guessButtonCount, oneTickAtSpeed } = settings;

    const duration = oneTickAtSpeed;
    const anims = TaskGroup.create();
    anims.add(
        Anime.LoadingSpinner.run({
            opacity: Fade.out,
            delay: duration,
            duration: 0.15 * duration,
            easing: Ease.linear,
        }),
    );
    anims.add(
        Anime.QuestionImage.run({
            opacity: Fade.in,
            delay: duration,
            duration,
            easing: Ease.linear,
        }),
    );
    anims.add(
        Anime.QuestionText.run({
            opacity: Fade.in,
            delay: 1.5 * duration,
            duration,
            easing: Ease.linear,
        }),
    );
    anims.add(
        Anime.QuestionTimer.run({
            opacity: [0,0.55],
            delay: 1.5 * duration,
            duration,
            easing: Ease.linear,
        }),
    );
    for (let i = 0; i < guessButtonCount; i++) {
        anims.add(
            Anime.GuessButton(i).run({
                opacity: Fade.in,
                delay: 2.5 * duration + i * (0.5 * duration),
                duration: 0.25 * duration,
                easing: Ease.in.back,
            }),
        );
    }

    if (Anime.ScoreInfo.opacity !== Fade.one) {
        anims.add(
            Anime.ScoreInfo.run({
                opacity: Fade.in,
                delay: 2.5 * duration,
                duration: 3 * duration,
                easing: Ease.linear,
            }),
        );
    }

    if (Anime.QuizProgress.opacity !== Fade.one) {
        anims.add(
            Anime.QuizProgress.run({
                opacity: Fade.in,
                delay: 2.5 * duration,
                duration: 3 * duration,
                easing: Ease.linear,
            }),
        );
    }
    await anims.all();

    await Task.delay(0.75 * duration);

    const questionTimer = Anime.QuestionTimer;
    await questionTimer.run({
        scale: Scale.up,
        duration: 0.25 * duration,
    });

    await Task.delay(0.25 * duration);
    state.buttonAnswerMap.forEach((item) => {
        item!.buttonStyle = ButtonStyle.normal;
    });

    setState({ ...state, eventName: EventName.AwaitGuess });
}
