import { LoadingAnimation } from "../components/LoadingSpinner.animation";
import { LayoutAnimation } from "./LayoutAnimation";

export class TransitionAnimation {
    public static async NextQuestionLoading(): Promise<void> {
        await LayoutAnimation.QuestionImage().fadeOut();
        await LoadingAnimation.fadeIn();
    }
    
    public static async NextQuestionReady(): Promise<void> {
        await LoadingAnimation.fadeOut();
        await LayoutAnimation.QuestionImage().fadeIn();
    }
}
