import { QuizItem } from "../models/QuizItem";
import { wait } from "../../core/functions/wait";
import { TIME } from "../elements/waitTimes";

export async function loadQuizImages(
    quizItems: QuizItem[],
): Promise<void> {
    console.info("Loading quiz images...");
    for (const item of quizItems) {
        item.image.src = item.imageSrc;
        await wait(TIME.LOADING_THROTTLE);
    }
}
