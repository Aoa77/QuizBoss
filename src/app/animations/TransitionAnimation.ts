import { LayoutAnimation } from "./LayoutAnimation";

export class TransitionAnimation {

    public static async NextQuestionLoading():Promise<void> {
        await LayoutAnimation.QuestionImage().fadeOut();
        await LayoutAnimation.LoadingSpinner().fadeIn();
    }
    
public static async NextQuestionReady():Promise<void> {
    await LayoutAnimation.LoadingSpinner().fadeOut();
    await LayoutAnimation.QuestionImage().fadeIn();
}

}
