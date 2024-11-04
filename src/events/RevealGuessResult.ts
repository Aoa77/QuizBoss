import { QuestionTimer } from "../components/QuestionTimer";
import { Ease, Fade, Scale } from "../libs/anime-context/AnimeContext.constants";
import { FlowContext } from "../libs/flow-context/FlowContext";
import { TaskGroup } from "../libs/friendlies/Task";
import { Anime, GuessButtonRef } from "../models/Anime";
import { ButtonStyle } from "../models/ButtonStyle";
import { EventName } from "../models/EventName";
import { QuizState } from "../models/QuizState";

export async function RevealGuessResult() {
    const [state, setState] = FlowContext.current<QuizState>();
    const { guessButtonIndex, settings, buttonAnswerMap } = state;
    const button = buttonAnswerMap[guessButtonIndex]!;
    const {
        oneTickAtSpeed,
        pauseTimerBetweenQuestions,
        convertRemainingTimeToBonusPoints,
    } = settings;

    if (pauseTimerBetweenQuestions) {
        QuestionTimer.RefObject.stop();
    }

    const duration = oneTickAtSpeed;
    const buttonRef = Anime.GuessButton(guessButtonIndex);
    await buttonRef.run({
        scale: buttonRef.scaleUp,
        delay: 0,
        duration: 0.25 * duration,
        endDelay: 0,
        easing: Ease.out.elastic(3, 1),
    });

    if (button.buttonStyle === ButtonStyle.wrong) {
        setState({ ...state, eventName: EventName.ConcludeWrongGuess });
        return;
    }

    await _concludeFinalGuess(buttonRef, state, duration);
    state.quizScore += state.itemScore;
    if (convertRemainingTimeToBonusPoints) {
        state.quizScore += QuestionTimer.RefObject.secondsRemaining;
    }
    setState({ ...state, eventName: EventName.ConcludeQuestion });
}

async function _concludeFinalGuess(
    buttonRef: GuessButtonRef,
    state: QuizState,
    duration: number,
) {
    ///
    const { guessButtonIndex, itemScore } = state;
    const anims = TaskGroup.create();

    ///
    let otherButton = 0;
    state.buttonAnswerMap.forEach((_, bidx) => {
        if (bidx === guessButtonIndex) {
            return;
        }
        const button: GuessButtonRef = Anime.GuessButton(bidx);
        anims.add(
            button
                .run({
                    opacity: Fade.out,
                    delay: 0.35 * duration * otherButton,
                    duration: 0.5 * duration,
                    easing: Ease.linear,
                })
                .then(() => {
                    button.opacity = Fade.zero;
                    button.scale = button.scaleMin;
                }),
        );
        ++otherButton;
    });

    ///
    await anims.all();

    ///
    const questionText = Anime.QuestionText;
    const translateY = questionText.rect!.top - buttonRef.rect!.top;

    await buttonRef.run({
        scale: [buttonRef.scaleDown],
        delay: 0,
        duration: 0.5 * duration,
        easing: Ease.out.elastic(3, 0.75),
    });

    const slide = TaskGroup.create();
    slide.add(
        questionText.targetWith([Anime.QuestionTimer]).run({
            opacity: Fade.zero,
            delay: 0.125 * duration,
            duration: 0.25 * duration,
            easing: Ease.linear,
        }),
    );
    slide.add(
        buttonRef.run({
            translateY,
            delay: 0.25 * duration,
            duration,
            endDelay: 0,
            easing: Ease.out.elastic(2.75, 1),
        }),
    );

    ///
    await slide.all();
    await _showScoreAndTransition(itemScore, buttonRef, duration);
}

async function _showScoreAndTransition(
    itemScore: number,
    buttonRef: GuessButtonRef,
    duration: number,
) {
    const scoreRef = Anime.GuessPoints;
    scoreRef.opacity = Fade.one;

    const bonusRef = Anime.TimeBonus;
    bonusRef.opacity = Fade.one;

    const scoreAnims = TaskGroup.create();
    scoreAnims.add(
        scoreRef.run({
            scale: Scale.up,
            duration: 0.25 * duration,
            endDelay: 1.25 * duration,
            easing: Ease.out.elastic(3, 0.75),
        }),
    );
    if (itemScore > 0) {
        scoreAnims.add(
            bonusRef.run({
                scale: Scale.up,
                delay: 1.25 * duration,
                duration: 0.25 * duration,
                endDelay: 1.25 * duration,
                easing: Ease.out.elastic(3, 0.75),
            }),
        );
    }
    await scoreAnims.all();

    const anims = TaskGroup.create();
    anims.add(
        buttonRef.run({
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

    if (itemScore > 0) {
        anims.add(
            bonusRef.run({
                opacity: Fade.out,
                delay: 0.5 * duration,
                duration: 0.5 * duration,
                easing: Ease.linear,
            }),
        );
    }

    ///
    await anims.all();
    buttonRef.clearTransforms();

    scoreRef.scale = Scale.zero;
    bonusRef.scale = Scale.zero;

    scoreRef.opacity = Fade.zero;
    bonusRef.opacity = Fade.zero;
}
