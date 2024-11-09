// Animation and UI
import { Anime, GuessButtonRef } from "../code/Anime";
import { ButtonStyle } from "../code/ButtonStyle";
import { TV } from "../code/Theme";
import { ThemeVars } from "../libs/theme-vars/ThemeVars";

// Flow and Events
import { assertFlowEvent, EventName } from "../code/EventName";
import { FlowContext } from "../libs/flow-context/FlowContext";

// Game Logic
import { QuizItem } from "../code/QuizItem";
import { AppState } from "../app/App.state";
import { TimerStatus } from "../code/Timer";

// Utilities
import { $ease, $time } from "../libs/anime-context/AnimeContext.constants";
import { TaskGroup } from "../libs/friendlies/Task";

export async function RevealGuessResult() {
    assertFlowEvent(EventName.RevealGuessResult);
    const [state, setState] = FlowContext.current<AppState>();
    const {
        buttonAnswerMap,
        guessButtonIndex, /////////
        timer,
    } = state;
    const button = buttonAnswerMap[guessButtonIndex]!;

    const buttonRef = Anime.GuessButton(guessButtonIndex);
    await buttonRef.run({
        scale: buttonRef.scaleUp,
        delay: 0,
        duration: $time.ticks(0.25),
        endDelay: 0,
        easing: $ease.out.elastic(3, 1),
    });

    if (button.buttonStyle === ButtonStyle.wrong) {
        setState((state) => ({ ...state, eventName: EventName.ConcludeWrongGuess }));
        return;
    }

    ///
    await timer.stop();
    const { secondsRemaining } = timer;

    const anim = Anime.QuestionTimer;
    let tv = TV.QuestionTimer_GOOD_color;
    if (timer.status === TimerStatus.TimedOut) {
        tv = TV.QuestionTimer_BAD_color;
    } else if (button.buttonStyle === ButtonStyle.reveal) {
        tv = TV.QuestionTimer_BAD_color;
    }
    anim.color = ThemeVars.getRef(TV, tv);
    anim.run({
        opacity: 1,
        duration: $time.tick,
        easing: $ease.linear,
    });

    ///
    const { itemScore } = state;
    let { quizScore } = state;
    _logScoreDetails(itemScore, quizScore, secondsRemaining);

    ///
    await _concludeFinalGuess(buttonRef, buttonAnswerMap, guessButtonIndex, itemScore);
    quizScore += itemScore;
    if (itemScore > 0) {
        quizScore += secondsRemaining;
    }
    setState((state) => ({
        ...state,
        quizScore,
        eventName: EventName.ConcludeQuestion,
    }));
}

function _logScoreDetails(
    itemScore: number,
    quizScore: number,
    secondsRemaining: number,
) {
    console.group("SCORE DETAILS");
    console.info("itemScore", itemScore);
    console.info("quizScore", quizScore);
    console.info("secondsRemaining", secondsRemaining);
    console.groupEnd();
}

async function _concludeFinalGuess(
    buttonRef: GuessButtonRef,
    buttonAnswerMap: (QuizItem | null)[],
    guessButtonIndex: number,
    itemScore: number,
) {
    ///
    const anims = TaskGroup.create();
    let otherButton = 0;

    ///
    buttonAnswerMap.forEach((_, bidx) => {
        if (bidx === guessButtonIndex) {
            return;
        }
        const button: GuessButtonRef = Anime.GuessButton(bidx);
        anims.add(() =>
            button
                .run({
                    opacity: [1, 0],
                    delay: $time.ticks(0.25) * otherButton,
                    duration: $time.ticks(0.5),
                    easing: $ease.linear,
                })
                .then(() => {
                    button.opacity = 0;
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
        duration: $time.ticks(0.5),
        easing: $ease.out.elastic(3, 0.75),
    });

    const slide = TaskGroup.create();
    slide.add(() =>
        Anime.QuestionTimer.run({
            opacity: 0,
            delay: $time.ticks(0.125),
            duration: $time.ticks(0.25),
            easing: $ease.linear,
        }),
    );
    slide.add(() =>
        buttonRef.run({
            translateY,
            delay: $time.ticks(0.25),
            duration: $time.tick,
            endDelay: 0,
            easing: $ease.out.elastic(2.75, 1),
        }),
    );

    ///
    await slide.all();
    await _showScoreAndTransition(itemScore, buttonRef);
}

async function _showScoreAndTransition(itemScore: number, buttonRef: GuessButtonRef) {
    const scoreRef = Anime.GuessPoints;
    scoreRef.opacity = 1;

    const bonusRef = Anime.TimeBonus;
    bonusRef.scale = 0;
    bonusRef.opacity = 1;

    const scoreAnims = TaskGroup.create();
    scoreAnims.add(() =>
        scoreRef.run({
            scale: [0, 1],
            duration: $time.ticks(0.25),
            endDelay: $time.ticks(1.25),
            easing: $ease.out.elastic(3, 0.75),
        }),
    );
    if (itemScore > 0) {
        scoreAnims.add(() =>
            bonusRef.run({
                scale: [0, 1],
                delay: $time.ticks(1.25),
                duration: $time.ticks(0.25),
                endDelay: $time.ticks(1.25),
                easing: $ease.out.elastic(3, 0.75),
            }),
        );
    }
    await scoreAnims.all();

    const anims = TaskGroup.create();
    anims.add(() =>
        buttonRef.run({
            opacity: [1, 0],
            delay: 0,
            duration: $time.ticks(0.5),
            easing: $ease.linear,
        }),
    );
    anims.add(() =>
        scoreRef.run({
            opacity: [1, 0],
            delay: $time.ticks(0.25),
            duration: $time.ticks(0.5),
            easing: $ease.linear,
        }),
    );

    if (itemScore > 0) {
        anims.add(() =>
            bonusRef.run({
                opacity: [1, 0],
                delay: $time.ticks(0.5),
                duration: $time.ticks(0.5),
                easing: $ease.linear,
            }),
        );
    }

    ///
    await anims.all();
    buttonRef.clearTransforms();

    scoreRef.scale = 0;
    bonusRef.scale = 0;

    scoreRef.opacity = 0;
    bonusRef.opacity = 0;

    Anime.QuestionTimer.color = ThemeVars.getRef(TV, TV.QuestionTimer_NORMAL_color);
}
