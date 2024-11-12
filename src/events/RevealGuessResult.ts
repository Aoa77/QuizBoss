import { AppContext } from "../app/context";

// code
import { Anim } from "../code/Animation";
import { ButtonStyle } from "../code/ButtonStyle";
import { EventName } from "../code/EventName";
import { QuizItem } from "../code/QuizItem";
import { TimerStatus } from "../libs/anime-context/Timer";
import { TV } from "../code/Theme";

/// libs
import { $ease, $time } from "../libs/anime-context/constants";
import { TaskGroup } from "../libs/friendlies/Task";
import { ThemeVars } from "../libs/theme-vars/ThemeVars";
import { AnimeRef } from "../libs/anime-context";

export async function RevealGuessResult() {
    const { state, flow, timer } = AppContext.current(
        EventName.RevealGuessResult,
    );
    const { buttonAnswerMap, guessButtonIndex } = state;
    const button = buttonAnswerMap[guessButtonIndex]!;

    const buttonRef = Anim.GuessButton(guessButtonIndex);
    await buttonRef.run({
        scale: [1.0, 1.3],
        delay: 0,
        duration: $time.ticks(0.25),
        endDelay: 0,
        easing: $ease.out.elastic(3, 1),
    });

    if (button.buttonStyle === ButtonStyle.wrong) {
        flow.dispatch((state) => ({
            ...state,
            eventName: EventName.ConcludeWrongGuess,
        }));
        return;
    }

    ///
    await timer.stop();
    const { secondsRemaining } = timer;

    const anim = Anim.QuestionTimer;
    let tv = TV.QuestionTimer_GOOD_color;
    if (timer.status === TimerStatus.TimedOut) {
        tv = TV.QuestionTimer_BAD_color;
    } else if (button.buttonStyle === ButtonStyle.reveal) {
        tv = TV.QuestionTimer_BAD_color;
    }
    anim.immediate({ color: ThemeVars.getRef(TV, tv) });
    anim.run({
        opacity: 1,
        duration: $time.ticks(1),
        easing: $ease.linear,
    });

    ///
    const { itemScore } = state;
    let { quizScore } = state;
    _logScoreDetails(itemScore, quizScore, secondsRemaining);

    ///
    await _concludeFinalGuess(
        buttonRef,
        buttonAnswerMap,
        guessButtonIndex,
        itemScore,
    );
    quizScore += itemScore;
    if (itemScore > 0) {
        quizScore += secondsRemaining;
    }
    flow.dispatch((state) => ({
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
    buttonRef: AnimeRef,
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
        const button: AnimeRef = Anim.GuessButton(bidx);
        anims.add(() =>
            button
                .run({
                    opacity: [1, 0],
                    delay: $time.ticks(0.25) * otherButton,
                    duration: $time.ticks(0.5),
                    easing: $ease.linear,
                })
                .then(() => {
                    button.immediate({ opacity: 0, scale: 0 });
                }),
        );
        ++otherButton;
    });

    ///
    await anims.all();

    ///
    const questionText = Anim.QuestionText;
    const translateY = questionText.rect!.top - buttonRef.rect!.top;

    await buttonRef.run({
        scale: [1.3, 1.0],
        delay: 0,
        duration: $time.ticks(0.5),
        easing: $ease.out.elastic(3, 0.75),
    });

    const slide = TaskGroup.create();
    slide.add(() =>
        Anim.QuestionTimer.run({
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
            duration: $time.ticks(1),
            endDelay: 0,
            easing: $ease.out.elastic(2.75, 1),
        }),
    );

    ///
    await slide.all();
    await _showScoreAndTransition(itemScore, buttonRef);
}

async function _showScoreAndTransition(itemScore: number, buttonRef: AnimeRef) {
    const scoreRef = Anim.GuessPoints;
    scoreRef.immediate({ opacity: 1 });

    const bonusRef = Anim.TimeBonus;
    bonusRef.immediate({ opacity: 1, scale: 0 });

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
    buttonRef.immediate({ opacity: 0, scale: 0 });
    scoreRef.immediate({ opacity: 0, scale: 0 });

    const timerRef = Anim.QuestionTimer;
    timerRef.immediate({
        color: ThemeVars.getRef(TV, TV.QuestionTimer_NORMAL_color),
    });
}
