import { AnimeParams } from "animejs";
import { Xref } from "../../core/xobjs/Xref";
import { Xelement } from "../../core/xobjs/Xelement";
import { getElementButtons } from "../../core/functions/getElementButtons";

export function driftUp(xref: Xref): AnimeParams {
    const topButton = getElementButtons()[0];
    const button = xref as Xelement<HTMLButtonElement>;

    const yDistance = button.element.offsetTop - topButton.element.offsetTop;
    return {
        targets: xref.idSelector,
        duration: 1000,
        translateY: `-${yDistance}px`,
    };
}
