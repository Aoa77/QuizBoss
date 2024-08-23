export const InternalConfig = {
    onlyDuplicates: true,
    infiniteLoopFailSafeMultiplier: 3,
};

export interface Config {
    quizModuleName: string;
    enableDummies: boolean;
    guessButtonCount: number;
    loadThrottle: number;
    maxQuestions: number;
    nextDelay: number;
    spinnerPoll: number;
}

export const ConfigDefaults = {
    enableDummies: true,
    guessButtonCount: 4,
    loadThrottle: 50,
    maxQuestions: 2, // 0 = all
    nextDelay: 500,
    spinnerPoll: 100,
};
