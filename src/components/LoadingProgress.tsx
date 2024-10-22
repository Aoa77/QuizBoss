import { createRef } from "react";
import { CssUnit } from "../libs/theme-vars/CssUnit";
import { ThemeVars } from "../libs/theme-vars/ThemeVars";
import { ThemeFont, TV } from "../models/Theme";
import { LoadingProgressAnimation } from "./LoadingProgress.animation";
import { LoadingProgressConfig } from "./LoadingProgress.config";
import { LoadingSpinner } from "./LoadingSpinner";

const config: LoadingProgressConfig = { ref: createRef() };
config.animationId = "LoadingProgress";
config.animationDuration = 1000;

export function LoadingProgress() {
    ///
    config.sectionStyle = {
        color: ThemeVars.getRef(TV, TV.LoadingProgress_TEXT_color),
        fontFamily: ThemeFont.mono,
        fontSize: CssUnit.rem(2),
        fontWeight: "bold",
        height: CssUnit.cqh(LoadingSpinner.config.sectionHeight!),
        marginTop: CssUnit.cqh(3 + LoadingSpinner.config.sectionMarginTop!),
    };

    ///
    config.progBarBackground = {
        backgroundColor: ThemeVars.getRef(
            TV,
            TV.LoadingProgress_BAR_backgroundColor,
        ),
        width: CssUnit.cqw(33),
        height: CssUnit.cqh(0.3),
        margin: "auto",
        marginTop: CssUnit.cqh(1.2),
    };

    ///
    config.progBarCompleted = {
        backgroundColor: ThemeVars.getRef(TV, TV.LoadingProgress_BAR_color),
        width: ThemeVars.getRef(TV, TV.LoadingProgress_BAR_width),
        height: "100%",
    };

    ///
    return (
        <section
            id={config.animationId}
            ref={config.ref}
            style={config.sectionStyle}>
            LOADING
            <div style={config.progBarBackground}>
                <div style={config.progBarCompleted}></div>
            </div>
        </section>
    );
}

LoadingProgress.config = config;
LoadingProgress.animation = new LoadingProgressAnimation(config);
