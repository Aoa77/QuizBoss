import { CssUnit } from "../libs/theme-vars/CssUnit";
import { ThemeVars } from "../libs/theme-vars/ThemeVars";
import { ThemeFont, TV } from "../models/Theme";
import { LoadingProgressAnimation } from "./LoadingProgress.animation";
import { LoadingProgressConfig } from "./LoadingProgress.config";
import { LoadingSpinner } from "./LoadingSpinner";

const config: LoadingProgressConfig = {};
config.animationId = "LoadingProgress";

export function LoadingProgress() {
    config.sectionStyle = {
        color: ThemeVars.getRef(TV, TV.LoadingProgress_TEXT_color),
        fontFamily: ThemeFont.mono,
        fontSize: CssUnit.rem(2),
        fontWeight: "bold",
        height: CssUnit.cqh(LoadingSpinner.config.sectionHeight!),
        marginTop: CssUnit.cqh(2 + LoadingSpinner.config.sectionMarginTop!),
    };
    return (
        <section id={config.animationId} style={config.sectionStyle}>
            LOADING
        </section>
    );
}

LoadingProgress.config = config;
LoadingProgress.animation = new LoadingProgressAnimation(config);
