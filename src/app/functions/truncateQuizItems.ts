import { AppSettings } from "../models/AppSettings";
import { QuizModule } from "../models/QuizModule";

export function truncateQuizItems(
    settings: AppSettings,
    module: QuizModule,
): void {
    module.quizData.items = module.quizData.items.slice(
        0,
        settings.maxQuestions,
    );
}
