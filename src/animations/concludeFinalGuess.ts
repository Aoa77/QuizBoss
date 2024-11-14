import { QuizItem } from "../game/quiz";
import { AnimeRef } from "../libs/anime-context";
import { answerScoreTransition } from "./answerScoreTransition";
import { buttonSlide } from "./buttonSlide";
import { revealCorrectButton } from "./revealCorrectButton";

export async function concludeFinalGuess(
    buttonRef: AnimeRef,
    buttonAnswerMap: (QuizItem | null)[],
    guessButtonIndex: number,
    itemScore: number,
) {
    await revealCorrectButton(buttonRef, buttonAnswerMap, guessButtonIndex);
    await buttonSlide(buttonRef);
    await answerScoreTransition(itemScore, buttonRef);
}


