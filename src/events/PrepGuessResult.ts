import { AppContext } from "../app/context";
import { ButtonStyle } from "../code/ButtonStyle";
import { EventName } from "../code/EventName";

export async function PrepGuessResult() {
    const { state, flow } = AppContext.current(EventName.PrepGuessResult);
    const { buttonAnswerMap, guessButtonIndex, correctAnswerButtonIndex } =
        state;
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

    flow.dispatch((state) => ({
        ...state,
        buttonAnswerMap,
        itemScore,
        eventName: EventName.RevealGuessResult,
    }));
}
