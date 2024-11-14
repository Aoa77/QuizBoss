import { AppContext } from "../core/context";
import { AppEvent } from "../core/events";
import { ButtonState } from "../core/buttons";

export async function PrepGuessResult() {
    const { state, flow } = AppContext.current(AppEvent.PrepGuessResult);
    const { buttonAnswerMap, guessButtonIndex, correctAnswerButtonIndex } =
        state;
    let { itemScore } = state;
    buttonAnswerMap.forEach((_item, idx) => {
        const item = _item!;
        if (idx === guessButtonIndex) {
            if (idx === correctAnswerButtonIndex) {
                item.buttonStyle = ButtonState.correct;
                return;
            }
            --itemScore;
            item.buttonStyle = ButtonState.wrong;
            return;
        }
        if (item.buttonStyle === ButtonState.normal) {
            item.buttonStyle = ButtonState.dimmed;
            return;
        }
    });

    flow.dispatch((state) => ({
        ...state,
        buttonAnswerMap,
        itemScore,
        eventName: AppEvent.RevealGuessResult,
    }));
}
