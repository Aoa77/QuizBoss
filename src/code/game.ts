export enum ButtonState {
    correct = "correct",
    dimmed = "dimmed",
    disabled = "disabled",
    normal = "normal",
    reveal = "reveal",
    wrong = "wrong",
}

export enum EventName {
    AskQuestion = "AskQuestion",
    AwaitGuess = "AwaitGuess",
    ConcludeQuestion = "ConcludeQuestion",
    ConcludeWrongGuess = "ConcludeWrongGuess",
    LoadQuizModule = "LoadQuizModule",
    PrepGuessResult = "PrepGuessResult",
    PrepQuestion = "PrepQuestion",
    RevealGuessResult = "RevealGuessResult",
    StartApp = "StartApp",
    StartQuiz = "StartQuiz",
}
