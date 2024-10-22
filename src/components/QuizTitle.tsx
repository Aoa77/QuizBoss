import { CssUnit } from "../libs/theme-vars/CssUnit";
import { ThemeFont, TV } from "../models/Theme";
import { FlowContext } from "../libs/flow-context/FlowContext";
import { QuizState } from "../models/QuizState";
import { QuizTitleConfig } from "./QuizTitle.config";
import { QuizTitleAnimation } from "./QuizTitle.animation";
import { ThemeVars } from "../libs/theme-vars/ThemeVars";
import { createRef } from "react";

const config: QuizTitleConfig = { ref: createRef() };
config.animationId = "QuizTitle";
config.enableSecretReload = true;
config.animationDuration = 1500;
config.sectionStyle = {
    alignContent: "normal",
    color: ThemeVars.getRef(TV, TV.QuizTitle_color),
    fontFamily: ThemeFont.serif,
    fontSize: CssUnit.rem(7),
    height: CssUnit.cqh(10),
    marginTop: CssUnit.cqh(5),
};

export function QuizTitle() {
    const [state] = FlowContext.current<QuizState>();

    return (
        <section
            id={config.animationId}
            ref={config.ref}
            style={config.sectionStyle}
            onPointerDown={onPointerDown}>
            {state.quizModule?.quizData.title}
        </section>
    );
}

async function onPointerDown() {
    if (config.enableSecretReload) {
        window.location.reload();
        return;
    }
}

QuizTitle.config = config;
QuizTitle.animation = new QuizTitleAnimation(config);
