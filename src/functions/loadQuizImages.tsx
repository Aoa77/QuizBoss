import QuizItem from "../state/QuizItem";
import delay from "../time/delay";
import { Duration } from "../time/Duration";

export default async function loadQuizImages(
    quizItems: QuizItem[],
): Promise<void> {
    console.info("Loading quiz images...");
    for (const item of quizItems) {
        item.image.src = item.imageSrc;
        await delay(Duration.THROTTLE);
    }
}
