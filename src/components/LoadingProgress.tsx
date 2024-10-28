import { useMemo } from "react";
import { createAnimation } from "./LoadingProgress.animation";
import { useStyle } from "./LoadingProgress.style";

/////////////////////////////////////////////
const animation = createAnimation();
/////////////////////////////////////////////

export function LoadingProgress() {
    const style = useMemo(useStyle, []);
    ///
    return useMemo(() => (
        <section
            id={animation.id}
            ref={animation.ref}
            style={style.section}>
            LOADING
            <div style={style.progBarBackground}>
                <div style={style.progBarForeground}></div>
            </div>
        </section>
    ), [style]);
}

/////////////////////////////////////////////
LoadingProgress.animation = animation;
/////////////////////////////////////////////
