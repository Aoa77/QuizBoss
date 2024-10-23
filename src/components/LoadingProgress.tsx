import { createConfig } from "./LoadingProgress.config";
import { createAnimation } from "./LoadingProgress.animation";

/////////////////////////////////////////////
const config = createConfig();
const animation = createAnimation(config);
/////////////////////////////////////////////

export function LoadingProgress() {
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

/////////////////////////////////////////////
LoadingProgress.config = config;
LoadingProgress.animation = animation;
/////////////////////////////////////////////
