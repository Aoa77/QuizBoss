import { CSSProperties } from "react";
import { GuessButtonConfig } from "./GuessButton.config";
import { FlowContext } from "../libs/flow-context/FlowContext";
import { QuizState } from "../models/QuizState";

const temp = "hello";
/////////////////////////////////////////////
export function GuessButton(config: GuessButtonConfig) {

    const [state] = FlowContext.current<QuizState>();
    console.debug("config", config);
    const style: CSSProperties = {
        color: "red",
        fontSize: "12rem",
        fontWeight: "bold",
    };
    return (
        <span
            // id={config.id}
            // key={config.id}
            // ref={config.ref}
            style={style}>
            {state.answerButtonIndex}
        </span>
    );
}

GuessButton.temp = temp;
