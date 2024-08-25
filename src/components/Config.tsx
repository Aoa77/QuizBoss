export const InternalConfig = {
    runTestAutomation: false,
};

export interface Config {
    quizModuleName: string;
    guessButtonCount: number;
    loadThrottle: number;
    maxQuestions: number;
    nextDelay: number;
    spinnerPoll: number;
}

export const ConfigDefaults = {
    guessButtonCount: 4,
    loadThrottle: 50,
    maxQuestions: 0, // 0 = all
    nextDelay: 500,
    spinnerPoll: 100,
};
