
export interface QuizConfig {
    /** Required. Specifies the quiz module name. */
    quizModuleName: string;

    /** Optional. Default value is 50. */
    imageLoadThrottle?: number;

    /** Optional. Default value is 1500. */
    resultDisplayTime?: number;

    /** Optional. Default value is 500. */
    spinnerPollingDelay?: number;

    /** Optional. Default value is 100. */
    spinnerPollingInterval?: number;
}
