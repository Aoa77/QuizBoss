export interface QuizConfig {
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

export const QuizConfigDefaults = {
    imageLoadThrottle: 50,
    resultDisplayTime: 500,
    spinnerPollingDelay: 2500,
    spinnerPollingInterval: 100,

    setDefaults: (config: QuizConfig): QuizConfig => {
        return {
            quizModuleName: config.quizModuleName,
            imageLoadThrottle:
                config.imageLoadThrottle ??
                QuizConfigDefaults.imageLoadThrottle,
            resultDisplayTime:
                config.resultDisplayTime ??
                QuizConfigDefaults.resultDisplayTime,
            spinnerPollingDelay:
                config.spinnerPollingDelay ??
                QuizConfigDefaults.spinnerPollingDelay,
            spinnerPollingInterval:
                config.spinnerPollingInterval ??
                QuizConfigDefaults.spinnerPollingInterval,
        };
    },
};
