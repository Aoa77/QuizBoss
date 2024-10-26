import { FlowContext } from "../libs/flow-context/FlowContext";
import { QuizState } from "../models/QuizState";
import { createConfig } from "./GuessButtons.config";

/////////////////////////////////////////////
const config = createConfig();
// const animation = createAnimation(config);
/////////////////////////////////////////////

export function GuessButtons() {
    const [state] = FlowContext.current<QuizState>();
    const guessButtonCount = state.settings.guessButtonCount;
    const buttonAnswerMap = state.buttonAnswerMap;
    const buttonJsx = [];

    for (let i = 0; i < guessButtonCount; i++) {
        const item = buttonAnswerMap[i];
        const text = item === null ? null : item.name;

        buttonJsx.push(
            <span key={i} style={config.spanStyle}>
                {text}
            </span>,
        );
    }

    return (
        <section id={config.id} ref={config.ref} style={config.sectionStyle}>
            {buttonJsx}
        </section>
    );
}

/////////////////////////////////////////////
GuessButtons.config = config;
/////////////////////////////////////////////
