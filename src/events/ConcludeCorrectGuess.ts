import { Ease, Fade, Scale } from "../libs/anime-context/AnimeContext.constants";
import { FlowContext } from "../libs/flow-context/FlowContext";
import { TaskGroup } from "../libs/friendlies/Task";
import { Anime } from "../models/Anime";
import { EventName } from "../models/EventName";
import { QuizState } from "../models/QuizState";

export async function ConcludeCorrectGuess() {
    ///
    const [state, setState] = FlowContext.current<QuizState>();
    const { settings } = state;
    const { oneTickAtSpeed } = settings;

    ///
    const duration = oneTickAtSpeed;
    const anims = TaskGroup.create();

    ///
    let otherButton = 0;
    state.buttonAnswerMap.forEach((_, bidx) => {
        if (bidx === state.guessButtonIndex) {
            return;
        }
        const button = Anime.GuessButton(bidx);
        anims.add(
            button
                .run({
                    opacity: Fade.out,
                    delay: 0.5 * duration * otherButton++,
                    duration,
                    easing: Ease.linear,
                })
                .then(() => {
                    button.opacity = Fade.out;
                    button.scale = Scale.one;
                }),
        );
    });

    ///
    await anims.all();

    ///
    const questionText = Anime.QuestionText;
    const button = Anime.GuessButton(state.guessButtonIndex);
    const translateY = questionText.rect!.top - button.rect!.top;

    await button.run({
        scale: Scale.one,
        delay: 0.25 * duration,
        duration,
        easing: Ease.out.elastic(3, 0.75),
    });

    const slide = TaskGroup.create();
    slide.add(
        questionText.run({
            opacity: Fade.out,
            delay: 0.125 * duration,
            duration: 0.25 * duration,
            easing: Ease.linear,
        }),
    );
    slide.add(
        button.run({
            translateY,
            delay: 0.25 * duration,
            duration,
            endDelay: 9 * duration,
            easing: Ease.out.elastic(3, 0.75),
        }),
    );

    ///
    await slide.all();
    button.clearTransforms();
    await button.run({
        opacity: Fade.out,
        delay: 0.5 * duration,
        duration,
        easing: Ease.linear,
    });
    setState({ ...state, eventName: EventName.AwaitGuess });
}
