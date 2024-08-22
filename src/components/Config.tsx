export interface Config {
    quizModuleName: string;
    guessButtonCount: number;
    loadThrottle: number;
    nextDelay: number;
    spinnerPoll: number;
}

export const ConfigDefaults = {
    guessButtonCount: 4,
    loadThrottle: 50,
    nextDelay: 500,
    spinnerPoll: 100,
};

export const InternalConfig = {
    onlyDuplicates: false,
    infiniteLoopFailSafeMultiplier: 5
};