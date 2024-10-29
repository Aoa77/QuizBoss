export enum EventName {
    AskQuestion = "AskQuestion",
    AwaitGuess = "AwaitGuess",
    ConcludeCorrectGuess = "ConcludeCorrectGuess",
    ConcludeQuestion = "ConcludeQuestion",
    ConcludeWrongFinalGuess = "ConcludeWrongFinalGuess",
    ConcludeWrongGuess = "ConcludeWrongGuess",
    LoadQuizModule = "LoadQuizModule",
    PrepGuessResult = "PrepGuessResult",
    PrepQuestion = "PrepQuestion",
    QuizComplete = "QuizComplete",
    RevealGuessResult = "RevealGuessResult",
    StartApp = "StartApp",
    StartQuiz = "StartQuiz",

    STOP_DEV = "STOP_DEV",
}
