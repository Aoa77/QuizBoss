import { AnimeInstance } from "animejs";
import { xref } from "../../core/animation/dom/xref";
import { XrefAnimation } from "../../core/animation/dom/XrefAnimation";
import { createAnimation } from "../../core/animation/runners";
import { wait } from "../../core/animation/wait";
import { ELEMENT } from "../constants/ELEMENT";
import { TIME } from "../constants/TIME";
import anime from "animejs";
import { LOADING_SPINNER } from "../constants/LOADING_SPINNER";

export class LoadingSpinnerAnimation {
    ///
    public static async fadeIn() {
        LoadingSpinnerAnimation.anim.restart();
        await LoadingSpinnerAnimation.xref.fadeIn();
        await wait(TIME.LOADING_FADE * 3);
    }

    ///
    public static async fadeOut() {
        await LoadingSpinnerAnimation.xref.fadeOut();
        LoadingSpinnerAnimation.anim.pause();
    }

    ///
    private static _xref: XrefAnimation | null = null;
    private static get xref(): XrefAnimation {
        LoadingSpinnerAnimation._xref ??= new XrefAnimation(
            xref.divs(ELEMENT.loadingSpinner)[0],
            TIME.LOADING_FADE,
        );
        return LoadingSpinnerAnimation._xref;
    }

    ///
    private static _anim: AnimeInstance | null = null;
    private static get anim(): AnimeInstance {
        const speed = 700;
        const targets = "section#loading > svg > circle";
        LoadingSpinnerAnimation._anim ??= createAnimation({
            targets,
            keyframes: [
                { r: LOADING_SPINNER.RADIUS_LARGE },
                { r: LOADING_SPINNER.RADIUS_SMALL, delay: speed },
            ],
            delay: anime.stagger(speed / 2),
            duration: speed,
            easing: "spring(1, 120, 10, 20)",
            loop: true,
        });
        return LoadingSpinnerAnimation._anim;
    }
}
