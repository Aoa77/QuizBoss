import { Anim } from "../code/animation";
import { QuizItem } from "../code/data";
import { AnimeRef } from "../libs/anime-context";
import { $time, $ease } from "../libs/anime-context/constants";
import { TaskGroup } from "../libs/friendlies/Task";
import { AnswerScoreTransition } from "./AnswerScoreTransition";
import { ConcludeButtonReveal } from "./ConcludeButtonReveal";

export async function ConcludeFinalGuess(
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
                    delay: $time.ticks(0.5) * otherButton,
                    duration: $time.ticks(1),
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

    await ConcludeButtonReveal(buttonRef, 2);

    const slide = TaskGroup.create();
    slide.add(() =>
        Anim.QuestionTimer.run({
            opacity: 0,
            delay: $time.ticks(1),
            duration: $time.ticks(1),
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
    await AnswerScoreTransition(itemScore, buttonRef);
}


