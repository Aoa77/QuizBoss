import { QuizData } from "./QuizData";

export interface QuizModule {
    name: string;
    version: string;
    quizData: QuizData;
}
