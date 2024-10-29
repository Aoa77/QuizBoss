import { GuessButtons } from "../components/GuessButtons";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { QuestionImage } from "../components/QuestionImage";
import { QuestionText } from "../components/QuestionText";
import { Duration } from "../libs/anime-context/AnimeContext.constants";
import { FlowContext } from "../libs/flow-context/FlowContext";
import { TaskGroup } from "../libs/friendlies/Task";
import { EventName } from "../models/EventName";
import { QuizState } from "../models/QuizState";

export async function AskQuestion() {
    const [state, setState] = FlowContext.current<QuizState>();
    const { settings } = state;
    const { guessButtonCount } = settings;

    const duration = Duration.oneSecond;
    const anims = TaskGroup.create();
    anims.add(
        LoadingSpinner.animation.out({
            delay: duration,
            duration: 0.15 * duration,
            enable: true,
        }),
    );
    anims.add(
        QuestionImage.animation.in({
            delay: duration,
            duration,
            enable: true,
        }),
    );
    anims.add(
        QuestionText.animation.in({
            delay: 0.85 * duration,
            duration,
            enable: true,
        }),
    );
    for (let i = 0; i < guessButtonCount; i++) {
        anims.add(
            GuessButtons.animations[i].in({
                delay: (1 + 0.52 * i) * duration,
                duration,
                enable: true,
            }),
        );
    }
    await anims.all();

    setState({ ...state, eventName: EventName.AwaitGuess });
}
