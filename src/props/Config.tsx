export interface Config {
    quizModuleName: string;
    demoMode: boolean;
    guessButtonCount: number;
    maxQuestions: number;
}

export const ConfigDefaults = {
    demoMode: true,
    guessButtonCount: 4,
    maxQuestions: 3, // 0 = all
};
