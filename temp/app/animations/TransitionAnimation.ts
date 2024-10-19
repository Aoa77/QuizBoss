import { wait } from "../../core/animation/wait";
import { LoadingAnimation } from "../components/LoadingSpinner.xref";
import { TIME } from "../constants/TIME";
import { LayoutAnimation } from "./LayoutAnimation";

export class TransitionAnimation {
    public static async NextQuestionLoading(): Promise<void> {
        LayoutAnimation.QuestionImage().scaleOut();
        await LoadingAnimation.start();
        await wait(TIME.START_DELAY);
    }
    
    public static async NextQuestionReady(): Promise<void> {
        LoadingAnimation.stop();
        await LayoutAnimation.QuestionImage().fadeIn();
    }
}
