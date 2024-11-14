import { Anim } from "../../code/AnimationManager";
import { TV } from "../../app/themes";
import { AnimeRef, $time, $ease } from "../../libs/anime-context";
import { TaskGroup } from "../../libs/friendlies/Task";
import { ThemeVars } from "../../libs/theme-vars/ThemeVars";

export async function answerScoreTransition(
    itemScore: number,
    buttonRef: AnimeRef,
) {
    const scoreRef = Anim.AnswerPoints;
    scoreRef.immediate({ opacity: 1 });

    const bonusRef = Anim.AnswerPointsTimeBonus;
    bonusRef.immediate({ opacity: 1, scale: 0 });

    const scoreAnims = TaskGroup.create();
    scoreAnims.add(
        () =>
            scoreRef.run({
                scale: [0, 1],
                duration: $time.ticks(1),
                easing: $ease.out.elastic(3, 0.75),
            }),
        () =>
            scoreRef.run({
                opacity: [1, 0],
                delay: $time.ticks(1),
                duration: $time.ticks(4),
                easing: $ease.linear,
            }),
    );
    if (itemScore > 0) {
        scoreAnims.add(
            () =>
                bonusRef.run({
                    scale: [0, 1],
                    delay: $time.ticks(2),
                    duration: $time.ticks(1),
                    easing: $ease.out.elastic(3, 0.75),
                }),
            () =>
                bonusRef.run({
                    opacity: [1, 0],
                    delay: $time.ticks(3),
                    duration: $time.ticks(4),
                    easing: $ease.linear,
                }),
        );
    }
    await scoreAnims.all();

    const anims = TaskGroup.create();
    anims.add(() =>
        buttonRef.run({
            opacity: [1, 0],
            delay: 0,
            duration: $time.ticks(1),
            easing: $ease.linear,
        }),
    );

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
