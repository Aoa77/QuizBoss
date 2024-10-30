import { Ease, Fade, Scale } from "../libs/anime-context/AnimeContext.constants";
import { AnimeRef } from "../libs/anime-context/AnimeRef";
import { FlowContext } from "../libs/flow-context/FlowContext";
import { TaskGroup } from "../libs/friendlies/Task";
import { Anime } from "../models/Anime";
import { ButtonStyle } from "../models/ButtonStyle";
import { EventName } from "../models/EventName";
import { QuizState } from "../models/QuizState";

export async function RevealGuessResult() {
    const [state, setState] = FlowContext.current<QuizState>();
    const { guessButtonIndex, settings, buttonAnswerMap } = state;
    const button = buttonAnswerMap[guessButtonIndex]!;
    const { oneTickAtSpeed } = settings;

    Anime.CorrectGuessPoints.scale = Scale.zero;
    Anime.CorrectGuessPoints.opacity = Fade.out;

    Anime.RevealGuessNoPoints.scale = Scale.zero;
    Anime.RevealGuessNoPoints.opacity = Fade.out;

    const duration = oneTickAtSpeed;
    await Anime.GuessButton(guessButtonIndex).run({
        scale: 1.3,
        delay: 0,
        duration: 0.25 * duration,
        endDelay: 0,
        easing: Ease.out.elastic(3, 1),
    });

    if (button.buttonStyle === ButtonStyle.wrong) {
        setState({ ...state, eventName: EventName.ConcludeWrongGuess });
        return;
    }

    const scoreRef =
        button.buttonStyle === ButtonStyle.correct
            ? Anime.CorrectGuessPoints
            : Anime.RevealGuessNoPoints;

    await _concludeFinalGuess(state, scoreRef, duration);
    state.quizScore += state.itemScore;
    setState({ ...state, eventName: EventName.ConcludeQuestion });
}

async function _concludeFinalGuess(
    state: QuizState,
    scoreRef: AnimeRef,
    duration: number,
) {
    ///
    const { guessButtonIndex } = state;
    const anims = TaskGroup.create();

    ///
    let otherButton = 0;
    state.buttonAnswerMap.forEach((_, bidx) => {
        if (bidx === guessButtonIndex) {
            return;
        }
        const button = Anime.GuessButton(bidx);
        anims.add(
            button
                .run({
                    opacity: Fade.out,
                    delay: 0.35 * duration * otherButton,
                    duration: 0.5 * duration,
                    easing: Ease.linear,
                })
                .then(() => {
                    button.opacity = Fade.out;
                    button.scale = Scale.one;
                }),
        );
        ++otherButton;
    });

    ///
    await anims.all();

    ///
    const questionText = Anime.QuestionText;
    const button = Anime.GuessButton(guessButtonIndex);
    const translateY = questionText.rect!.top - button.rect!.top;

    await button.run({
        scale: Scale.one,
        delay: 0,
        duration: 0.5 * duration,
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
            endDelay: 0,
            easing: Ease.out.elastic(2.75, 1),
        }),
    );

    ///
    await slide.all();
    await _showScoreAndTransition(state, scoreRef, duration);
}

async function _showScoreAndTransition(
    state: QuizState,
    scoreRef: AnimeRef,
    duration: number,
) {
    const { guessButtonIndex } = state;
    scoreRef.opacity = Fade.in;
    await scoreRef.run({
        scale: [Scale.zero, Scale.one],
        duration: 0.25 * duration,
        endDelay: 1.25 * duration,
        easing: Ease.out.elastic(3, 0.75),
    });

    const button = Anime.GuessButton(guessButtonIndex);
    const anims = TaskGroup.create();
    anims.add(
        button.run({
            opacity: Fade.out,
            delay: 0,
            duration: 0.5 * duration,
            easing: Ease.linear,
        }),
    );
    anims.add(
        scoreRef.run({
            opacity: Fade.out,
            delay: 0.25 * duration,
            duration: 0.5 * duration,
            easing: Ease.linear,
        }),
    );

    ///
    await anims.all();
    button.clearTransforms();
    scoreRef.scale = Scale.zero;
    scoreRef.opacity = Fade.out;
}
