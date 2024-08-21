export interface Config {
    /** Required. Specifies the quiz module name. */
    quizModuleName: string;

    /** Default value is 4. */
    guessButtonCount?: number;

    /** Default value is 50. */
    loadThrottle?: number;

    /** Default value is 500. */
    nextDelay?: number;

    /** Default value is 100. */
    spinnerPoll?: number;
}

export const ConfigDefaults = {
    guessButtonCount: 4,
    loadThrottle: 50,
    nextDelay: 500,
    spinnerPoll: 100,

    setDefaults: (config: Config): Config => {
        return {
            quizModuleName: config.quizModuleName,
            guessButtonCount: config.guessButtonCount ?? ConfigDefaults.guessButtonCount,
            loadThrottle: config.loadThrottle ?? ConfigDefaults.loadThrottle,
            nextDelay: config.nextDelay ?? ConfigDefaults.nextDelay,
            spinnerPoll: config.spinnerPoll ?? ConfigDefaults.spinnerPoll,
        };
    },
};
