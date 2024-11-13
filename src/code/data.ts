import { ButtonState } from "./game";

export interface QuizModule {
    name: string;
    version: string;
    quizData: QuizData;
}

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

export interface QuizItem {
    index: number;
    isDummy: boolean;
    key: string;
    duplicateItemKeys: string[];
    name: string;
    imageSrc: string;
    imageWidth: number;
    imageHeight: number;
    answeredCorrectly: boolean;
    buttonStyle: ButtonState;
}
