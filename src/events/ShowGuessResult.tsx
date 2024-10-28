import { GuessButtons } from "../components/GuessButtons";
import { FlowContext } from "../libs/flow-context/FlowContext";
import { ButtonStyle } from "../models/ButtonStyle";
import { EventName } from "../models/EventName";
import { QuizState } from "../models/QuizState";

export async function ShowGuessResult() {
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

    setState({ ...state, eventName: EventName.ShowGuessResultPart2 });
}

export async function ShowGuessResultPart2() {
    const [state, setState] = FlowContext.current<QuizState>();

    const animation = GuessButtons.animations[state.guessButtonIndex];
    await animation.zoomIn();

    //let correctGuess = false;
    state.buttonAnswerMap.forEach((_item) => {
        // if (correctGuess) {
        //     return;
        // }
        const item = _item!;
        switch (item.buttonStyle) {
            case ButtonStyle.correct:
                // correctGuess = true;
                item.buttonStyle = ButtonStyle.disabled;
                return;
            case ButtonStyle.wrong:
                item.buttonStyle = ButtonStyle.disabled;
                return;
            case ButtonStyle.dimmed:
                item.buttonStyle = ButtonStyle.normal;
                return;
        }
    });

    await animation.zoomOut();
    setState({ ...state, eventName: EventName.AwaitGuess });
}
