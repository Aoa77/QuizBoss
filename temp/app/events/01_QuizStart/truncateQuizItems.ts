import { AppSettings } from "../../../../src/app/AppSettings";
import { QuizModule } from "../../../../src/models/QuizModule";


export function truncateQuizItems(settings: AppSettings, module: QuizModule): void {
    module.quizData.items = module.quizData.items.slice(
        0,
        settings.maxQuestions
    );
}
