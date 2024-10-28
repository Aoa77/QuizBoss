import { FlowContext } from "../libs/flow-context/FlowContext";
import { ButtonStyle } from "../models/ButtonStyle";
import { EventName } from "../models/EventName";
import { QuizState } from "../models/QuizState";


export async function PrepGuessResult() {
    const [state, setState] = FlowContext.current<QuizState>();

    state.buttonAnswerMap.forEach((_item, idx) => {
        const item = _item!;
        if (idx === state.guessButtonIndex) {
            item.buttonStyle =
                idx === state.correctAnswerButtonIndex
                    ? ButtonStyle.correct
                    : ButtonStyle.wrong;
            return;
        }
        if (item.buttonStyle === ButtonStyle.normal) {
            item.buttonStyle = ButtonStyle.dimmed;
        }
    });

    setState({ ...state, eventName: EventName.RevealGuessResult });
}
