import { FlowContext } from "../libs/flow-context/FlowContext";
import { ButtonStyle } from "../code/ButtonStyle";
import { assertFlowEvent, EventName } from "../code/EventName";
import { QuizState } from "../code/QuizState";

export async function PrepGuessResult() {
    assertFlowEvent(EventName.PrepGuessResult);

    const [state, setState] = FlowContext.current<QuizState>();
    const { buttonAnswerMap, guessButtonIndex, correctAnswerButtonIndex } = state;
    let { itemScore } = state;
    buttonAnswerMap.forEach((_item, idx) => {
        const item = _item!;
        if (idx === guessButtonIndex) {
            if (idx === correctAnswerButtonIndex) {
                item.buttonStyle = ButtonStyle.correct;
                return;
            }
            --itemScore;
            item.buttonStyle = ButtonStyle.wrong;
            return;
        }
        if (item.buttonStyle === ButtonStyle.normal) {
            item.buttonStyle = ButtonStyle.dimmed;
            return;
        }
    });

    setState((state) => ({
        ...state,
        buttonAnswerMap,
        itemScore,
        eventName: EventName.RevealGuessResult,
    }));
}
