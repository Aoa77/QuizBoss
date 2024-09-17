import AppSettings from "../app/AppSettings";
import QuizModule from "../state/QuizModule";

export default function truncateQuizItems(
    settings: AppSettings,
    module: QuizModule,
): void {
    module.quizData.items = module.quizData.items.slice(
        0,
        settings.maxQuestions,
    );
}
