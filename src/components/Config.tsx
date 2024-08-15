export interface Config {
    /** Required. Specifies the quiz module name. */
    quizModuleName: string;

    /** Default value is 50. */
    imageLoadThrottle?: number;

    /** Default value is 500. */
    resultDisplayTime?: number;

    /** Default value is 500. */
    spinnerPollingDelay?: number;

    /** Default value is 100. */
    spinnerPollingInterval?: number;

    /** Default value is 500. */
    startupDelay?: number;
}

export const ConfigDefaults = {
    imageLoadThrottle: 25,
    resultDisplayTime: 250,
    spinnerPollingDelay: 500,
    spinnerPollingInterval: 50,
    startupDelay: 2500,

    setDefaults: (config: Config): Config => {
        return {
            quizModuleName: config.quizModuleName,

            imageLoadThrottle:
                config.imageLoadThrottle ?? ConfigDefaults.imageLoadThrottle,

            resultDisplayTime:
                config.resultDisplayTime ?? ConfigDefaults.resultDisplayTime,

            spinnerPollingDelay:
                config.spinnerPollingDelay ??
                ConfigDefaults.spinnerPollingDelay,

            spinnerPollingInterval:
                config.spinnerPollingInterval ??
                ConfigDefaults.spinnerPollingInterval,

            startupDelay: config.startupDelay ?? ConfigDefaults.startupDelay,
        };
    },
};
