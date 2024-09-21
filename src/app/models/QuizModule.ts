import QuizData from "./QuizData";

export default interface QuizModule {
    name: string;
    version: string;
    quizData: QuizData;
}
