import anime, { AnimeInstance } from "animejs";
import { xref } from "../../core/animation/dom/xref";
import { XrefAnimation } from "../../core/animation/dom/XrefAnimation";
import { createAnimation } from "../../core/animation/runners";
import { wait } from "../../core/animation/wait";
import { ELEMENT } from "../constants/ELEMENT";
import { TIME } from "../constants/TIME";
import { RADIUS } from "./LoadingSpinner.constants";

export class LoadingAnimation {
    ///
    public static async fadeIn() {
        LoadingAnimation.anim.restart();
        await LoadingAnimation.xref.fadeIn();
        await wait(TIME.LOADING_FADE * 3);
    }

    ///
    public static async fadeOut() {
        await LoadingAnimation.xref.fadeOut();
        LoadingAnimation.anim.pause();
    }

    ///
    private static _xref: XrefAnimation | null = null;
    private static get xref(): XrefAnimation {
        LoadingAnimation._xref ??= new XrefAnimation(
            xref.divs(ELEMENT.loadingSpinner)[0],
            TIME.LOADING_FADE,
        );
        return LoadingAnimation._xref;
    }

    ///
    private static _anim: AnimeInstance | null = null;
    private static get anim(): AnimeInstance {
        const speed = 700;
        const targets = "section#loading > svg > circle";
        LoadingAnimation._anim ??= createAnimation({
            targets,
            keyframes: [
                { r: RADIUS.RADIUS_LARGE },
                { r: RADIUS.RADIUS_SMALL, delay: speed },
            ],
            delay: anime.stagger(speed / 2),
            duration: speed,
            easing: "spring(1, 120, 10, 20)",
            loop: true,
        });
        return LoadingAnimation._anim;
    }
}
