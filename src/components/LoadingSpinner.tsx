import { SvgThings } from "../libs/theme-vars/SvgThings";
import { createAnimation } from "./LoadingSpinner.animation";
import { useStyle } from "./LoadingSpinner.style";

/////////////////////////////////////////////
const animation = createAnimation();
/////////////////////////////////////////////

export function LoadingSpinner() {
    ///
    const style = useStyle();
    const balls = style.cxArray.map((cx, key) => (
        <circle key={key} cx={cx} cy={style.cy} r={style.radiusBase} />
    ));

    return (
        <section
            id={animation.id}
            ref={animation.ref}
            style={style.section}>
            <svg
                style={style.svg}
                viewBox={style.viewBox}
                xmlns={SvgThings.xmlns}>
                {balls}
            </svg>
        </section>
    );
}

/////////////////////////////////////////////
LoadingSpinner.animation = animation;
/////////////////////////////////////////////
