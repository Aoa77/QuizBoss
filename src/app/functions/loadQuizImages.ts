import QuizItem from "../models/QuizItem";
import wait from "../../core/animation/wait";
import { Duration } from "../elements/fade";

export default async function loadQuizImages(
    quizItems: QuizItem[],
): Promise<void> {
    console.info("Loading quiz images...");
    for (const item of quizItems) {
        item.image.src = item.imageSrc;
        await wait(Duration.THROTTLE);
    }
}
