import { Duration, Ease, Fade } from "../libs/anime-context/AnimeContext.constants";
import { FlowContext } from "../libs/flow-context/FlowContext";
import { TaskGroup } from "../libs/friendlies/Task";
import { Anime } from "../models/Anime";
import { EventName } from "../models/EventName";
import { QuizState } from "../models/QuizState";

export async function AskQuestion() {
    const [state, setState] = FlowContext.current<QuizState>();
    const { settings } = state;
    const { guessButtonCount } = settings;

    const duration = Duration.oneSecond;
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
            delay: 0.85 * duration,
            duration,
            easing: Ease.linear,
        }),
    );
    for (let i = 0; i < guessButtonCount; i++) {
        anims.add(
            Anime.GuessButton(i).run({
                opacity: Fade.in,
                delay: (1 + 0.52 * i) * duration,
                duration,
                easing: Ease.linear,
            }),
        );
    }
    await anims.all();

    setState({ ...state, eventName: EventName.AwaitGuess });
}
