import { FlowContext } from "../libs/flow-context/FlowContext";
import { EventName } from "../models/EventName";
import { QuizState } from "../models/QuizState";
import { createAnimation, GuessButtonsAnimation } from "./GuessButtons.animation";
import { createConfig, GuessButtonsConfig } from "./GuessButtons.config";
import { createStyles } from "./GuessButtons.style";

///////////////////////////////////////////////////
const configs: GuessButtonsConfig[] = [];
const animations: GuessButtonsAnimation[] = [];
const style = createStyles();
///////////////////////////////////////////////////

export function GuessButtons() {
    const [state] = FlowContext.current<QuizState>();
    const guessButtonCount = state.settings.guessButtonCount;
    const buttonAnswerMap = state.buttonAnswerMap;
    const buttonJsx = [];

    for (let i = 0; i < guessButtonCount; i++) {
        const config = createConfig(i);
        configs.push(config);
        animations.push(createAnimation(config));

        const item = buttonAnswerMap[i];
        const text = item === null ? null : item.name;

        buttonJsx.push(
            <span key={i} style={style.spanStyle} onPointerDown={onPointerDown}>
                {text}
            </span>,
        );
    }

    return <section style={style.sectionStyle}>{buttonJsx}</section>;
}

async function onPointerDown() {
    const [state, setState] = FlowContext.current<QuizState>();
    if (state.eventName !== EventName.AwaitGuess) {
        return;
    }
    setState({ ...state, eventName: EventName.ConcludeQuestion });
}

/////////////////////////////////////////////
GuessButtons.configs = configs;
GuessButtons.animations = animations;
/////////////////////////////////////////////
