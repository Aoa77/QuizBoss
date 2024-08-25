export interface Config {
    quizModuleName: string;
    guessButtonCount: number;
    loadThrottle: number;
    maxQuestions: number;
    nextDelay: number;
    spinnerPoll: number;
    spinnerReset: boolean;
    demoMode: boolean;
}

export const ConfigDefaults = {
    guessButtonCount: 4,
    loadThrottle: 50,
    maxQuestions: 0, // 0 = all
    nextDelay: 500,
    spinnerPoll: 100,
    spinnerReset: false,
    demoMode: false,
};
