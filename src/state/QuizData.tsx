import QuizItem from "./QuizItem";

export default interface QuizData {
    title: string;
    description: string;
    questionText: string;
    scoreText: string;
    bestText: string;
    leaderText: string;
    dummies: string[];
    items: QuizItem[];
    randomizedGuessPool: QuizItem[];
}
