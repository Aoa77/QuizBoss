import { SvgThings } from "../libs/theme-vars/SvgThings";
import { createAnimation } from "./LoadingSpinner.animation";
import { createConfig } from "./LoadingSpinner.config";

/////////////////////////////////////////////
const config = createConfig();
const animation = createAnimation(config);
/////////////////////////////////////////////

export function LoadingSpinner() {
    ///
    const balls = config.cxArray!.map((cx, key) => (
        <circle key={key} cx={cx} cy={config.cy} r={config.radiusBase} />
    ));

    return (
        <section
            id={config.id}
            ref={config.ref}
            style={config.sectionStyle}>
            <svg
                style={config.svgStyle}
                viewBox={config.viewBox}
                xmlns={SvgThings.xmlns}>
                {balls}
            </svg>
        </section>
    );
}

/////////////////////////////////////////////
LoadingSpinner.config = config;
LoadingSpinner.animation = animation;
/////////////////////////////////////////////
