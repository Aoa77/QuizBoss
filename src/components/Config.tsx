export interface Config {
    /** Required. Specifies the quiz module name. */
    quizModuleName: string;

    /** Default value is 50. */
    loadThrottle?: number;

    /** Default value is 500. */
    nextDelay?: number;

    /** Default value is 100. */
    spinnerPoll?: number;
}

export const ConfigDefaults = {
    loadThrottle: 50,
    nextDelay: 500,
    spinnerPoll: 100,

    setDefaults: (config: Config): Config => {
        return {
            quizModuleName: config.quizModuleName,
            loadThrottle: config.loadThrottle ?? ConfigDefaults.loadThrottle,
            nextDelay: config.nextDelay ?? ConfigDefaults.nextDelay,
            spinnerPoll: config.spinnerPoll ?? ConfigDefaults.spinnerPoll,
        };
    },
};
