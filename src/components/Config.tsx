export interface Config {
    /** Required. Specifies the quiz module name. */
    quizModuleName: string;

    /** Optional. Default value is 50. */
    imageLoadThrottle?: number;

    /** Optional. Default value is 500. */
    resultDisplayTime?: number;

    /** Optional. Default value is 500. */
    spinnerPollingDelay?: number;

    /** Optional. Default value is 100. */
    spinnerPollingInterval?: number;
}

export const ConfigDefaults = {
    imageLoadThrottle: 50,
    resultDisplayTime: 500,
    spinnerPollingDelay: 2500,
    spinnerPollingInterval: 100,

    setDefaults: (config: Config): Config => {
        return {
            quizModuleName: config.quizModuleName,
            imageLoadThrottle:
                config.imageLoadThrottle ??
                ConfigDefaults.imageLoadThrottle,
            resultDisplayTime:
                config.resultDisplayTime ??
                ConfigDefaults.resultDisplayTime,
            spinnerPollingDelay:
                config.spinnerPollingDelay ??
                ConfigDefaults.spinnerPollingDelay,
            spinnerPollingInterval:
                config.spinnerPollingInterval ??
                ConfigDefaults.spinnerPollingInterval,
        };
    },
};
