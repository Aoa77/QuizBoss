import { QuestionTimer } from "../components/QuestionTimer";
import { FlowContext } from "../libs/flow-context/FlowContext";
import { ButtonStyle } from "../models/ButtonStyle";
import { assertFlowEvent, EventName } from "../models/EventName";
import { QuizState } from "../models/QuizState";

export async function PrepGuessResult() {
    assertFlowEvent(EventName.PrepGuessResult);
    const timer = QuestionTimer.RefObject;
    if (!timer.isRunning || timer.secondsRemaining < 1) {
        return;
    }
    const [state, setState] = FlowContext.current<QuizState>();
    state.buttonAnswerMap.forEach((_item, idx) => {

    if (!timer.isRunning || timer.secondsRemaining < 1) {
        return;
    }
        const item = _item!;
        if (idx === state.guessButtonIndex) {
            if (idx === state.correctAnswerButtonIndex) {
                item.buttonStyle = ButtonStyle.correct;
                return;
            }
            --state.itemScore;
            item.buttonStyle = ButtonStyle.wrong;
            return;
        }
        if (item.buttonStyle === ButtonStyle.normal) {
            item.buttonStyle = ButtonStyle.dimmed;
            return;
        }
    });


    if (!timer.isRunning || timer.secondsRemaining < 1) {
        return;
    }
    setState({ ...state, eventName: EventName.RevealGuessResult });
}
