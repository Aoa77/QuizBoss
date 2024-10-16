import { LayoutAnimation } from "./LayoutAnimation";
import { LoadingSpinnerAnimation } from "../components/LoadingSpinner";

export class TransitionAnimation {
    public static async NextQuestionLoading(): Promise<void> {
        await LayoutAnimation.QuestionImage().fadeOut();
        await LoadingSpinnerAnimation.fadeIn();
    }
    
    public static async NextQuestionReady(): Promise<void> {
        await LoadingSpinnerAnimation.fadeOut();
        await LayoutAnimation.QuestionImage().fadeIn();
    }
}
