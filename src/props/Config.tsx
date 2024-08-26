export interface Config {
    quizModuleName: string;

    demoMode: boolean;
    guessButtonCount: number;
    maxQuestions: number;
    spinnerReset: boolean;
    atomicDelay: number;
}

export const ConfigDefaults = {
    demoMode: false,
    guessButtonCount: 4,
    maxQuestions: 3, // 0 = all
    spinnerReset: true,
    atomicDelay: 25,
};
