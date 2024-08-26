export interface Config {
    quizModuleName: string;
    demoMode: boolean;
    guessButtonCount: number;
    maxQuestions: number;
}

export const ConfigDefaults = {
    demoMode: false,
    guessButtonCount: 4,
    maxQuestions: 0, // 0 = all
};
