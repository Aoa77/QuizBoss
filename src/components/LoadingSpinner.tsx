import { SvgThings } from "../libs/theme-vars/SvgThings";
import { CssUnit } from "../libs/theme-vars/CssUnit";
import { ThemeVars } from "../libs/theme-vars/ThemeVars";
import { TV } from "../models/Theme";
import { LoadingSpinnerConfig } from "./LoadingSpinner.config";
import { LoadingSpinnerAnimation } from "./LoadingSpinner.animation";

const config: LoadingSpinnerConfig = {};
config.animationId = "LoadingSpinner";
config.cxArray = [45, 70, 95];
config.cy = 50;
config.delayBeforeProgressBar = 2000;
config.fadeDuration = 200;
config.loopIteration = 700;
config.loopStagger = 100;
config.radiusArray = [3, 12, 3];
config.radiusBase = 5;
config.viewBox = SvgThings.viewBox([0, 0, 140, 140]);

config.sectionHeight = 20;
config.sectionMarginTop = 15;
config.sectionStyle = {
    height: CssUnit.cqh(config.sectionHeight),
    marginTop: CssUnit.cqh(config.sectionMarginTop),
};

config.svgStyle = {
    fill: ThemeVars.getRef(TV, TV.LoadingSpinner_fill),
    height: CssUnit.cqh(1 * config.sectionHeight),
};

const balls = config.cxArray.map((cx, key) => (
    <circle key={key} cx={cx} cy={config.cy} r={config.radiusBase} />
));

export function LoadingSpinner() {
    return (
        <section id={config.animationId} style={config.sectionStyle}>
            <svg
                style={config.svgStyle}
                viewBox={config.viewBox}
                xmlns={SvgThings.xmlns}>
                {balls}
            </svg>
        </section>
    );
}

LoadingSpinner.config = config;
LoadingSpinner.animation = new LoadingSpinnerAnimation(config);
