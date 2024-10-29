import { GuessButtons } from "../components/GuessButtons";
import { FlowContext } from "../libs/flow-context/FlowContext";
import { ButtonStyle } from "../models/ButtonStyle";
import { EventName } from "../models/EventName";
import { QuizState } from "../models/QuizState";

export async function RevealGuessResult() {
    const [state, setState] = FlowContext.current<QuizState>();
    const animations = GuessButtons.animations;
    const animation = animations[state.guessButtonIndex];
    await animation.zoomBig();

    let correctGuess = false;
    state.buttonAnswerMap.forEach((_item) => {
        if (correctGuess) {
            return;
        }
        const item = _item!;
        switch (item.buttonStyle) {
            case ButtonStyle.correct:
                correctGuess = true;
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

    if (correctGuess) {
        setState({ ...state, eventName: EventName.ConcludeCorrectGuess });
        return;
    }
    await animation.zoomNormal();
    setState({ ...state, eventName: EventName.AwaitGuess });
}
