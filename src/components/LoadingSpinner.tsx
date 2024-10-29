import { useAnimeRef, useAnimeRefs } from "../libs/anime-context/AnimeContext.hooks";
import { SvgThings } from "../libs/theme-vars/SvgThings";
import { AnimeComponent } from "../models/Anime";
import { useStyle } from "./LoadingSpinner.style";

export function LoadingSpinner() {
    const style = useStyle();
    const animation = useAnimeRef(AnimeComponent.LoadingSpinner);
    const ballAnims = useAnimeRefs(
        AnimeComponent.LoadingSpinnerBall,
        style.cxArray.length,
    );

    const balls = style.cxArray.map((cx, key) => (
        <circle
            id={ballAnims[key].id}
            key={key}
            cx={cx}
            cy={style.cy}
            r={style.radiusBase}
        />
    ));

    return (
        <section id={animation.id} style={style.section}>
            <svg style={style.svg} viewBox={style.viewBox} xmlns={SvgThings.xmlns}>
                {balls}
            </svg>
        </section>
    );
}

// import anime from "animejs";
// import { Duration, Ease, Fade } from "../libs/anime+/Constants";
// import { ComponentAnimation } from "../app/App.base";
// import { AnimParams } from "../models/AnimParams";
// import { AnimationTask } from "../libs/anime+/AnimationTask";

// enum AnimKey {
//     fadeIn = "fadeIn",
//     fadeOut = "fadeOut",
//     loop = "loop",
// }

// const config = {
//     loopIteration: 700,
//     loopStagger: 100,
//     radiusArray: [3, 12, 3],
// };

// export function createAnimation(): LoadingSpinnerAnimation {
//     return new LoadingSpinnerAnimation();
// }

// class LoadingSpinnerAnimation extends ComponentAnimation<AnimKey> {
//     private _loop: AnimationTask | null = null;

//     ///
//     public constructor() {
//         ///
//         super("LoadingSpinner");

//         ///
//         this.define(AnimKey.fadeIn, {
//             opacity: Fade.max,
//             duration: Duration.oneSecond,
//             easing: Ease.linear,
//         });

//         ///
//         this.define(AnimKey.fadeOut, {
//             opacity: Fade.min,
//             duration: Duration.oneSecond,
//             easing: Ease.linear,
//         });

//         ///
//         this.defineChild(AnimKey.loop, " > svg > circle", {
//             r: config.radiusArray,
//             loop: true,
//             delay: anime.stagger(config.loopStagger),
//             duration: config.loopIteration,
//             easing: Ease.linear,
//         });
//     }

//     ///
//     public async in(params: AnimParams): Promise<void> {
//         if (this._loop === null) {
//             this._loop = this.build(AnimKey.loop, params.enable);
//             if (!this._loop) {
//                 return;
//             }
//             this._loop.play();
//         }
//         const anim = this.build(AnimKey.fadeIn, params.enable, params);
//         if (anim) {
//             await anim.run();
//         }
//     }

//     ///
//     public async out(params: AnimParams): Promise<void> {
//         const anim = this.build(AnimKey.fadeOut, params.enable, params);
//         if (anim) {
//             await anim.run();
//         }
//     }
// }
