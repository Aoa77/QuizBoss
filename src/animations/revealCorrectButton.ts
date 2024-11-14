import { Anim } from ".";
import { QuizItem } from "../game/quiz";
import { AnimeRef, $time, $ease } from "../libs/anime-context";
import { Task } from "../libs/friendlies/Task";
import { concludeButtonReveal } from "./concludeButtonReveal";

///
export async function revealCorrectButton(
    buttonRef: AnimeRef,
    buttonAnswerMap: (QuizItem | null)[],
    guessButtonIndex: number) {
    const buttonAnims = Task.createGroup(() => concludeButtonReveal({ buttonRef, delayTicks: 0 })
    );
    buttonAnswerMap.forEach((_, bidx) => {
        if (bidx === guessButtonIndex) {
            return;
        }
        const button: AnimeRef = Anim.GuessButton(bidx);
        buttonAnims.add(() => button
            .run({
                opacity: [1, 0],
                duration: $time.ticks(buttonAnims.length * 0.75),
                easing: $ease.linear,
            })
            .then(() => {
                button.immediate({ opacity: 0, scale: 0 });
            })
        );
    });
    await buttonAnims.all();
}
