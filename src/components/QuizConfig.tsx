
export interface QuizConfig {
    /** Required. Sets the title of the quiz. */
    quizTitle: string;

    /** Required. Sets the question text for each quiz item. */
    itemQuestion: string;

    /** Required. Key/value for each quiz item. */
    jsonData: Record<string, string>;

    /** Optional. Default value is 50. */
    imageLoadThrottle?: number;

    /** Optional. Default value is 1500. */
    resultDisplayTime?: number;

    /** Optional. Default value is 500. */
    spinnerPollingDelay?: number;

    /** Optional. Default value is 100. */
    spinnerPollingInterval?: number;
}
