import { QuizItem } from "./QuizItem";

export interface QuizData {
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
