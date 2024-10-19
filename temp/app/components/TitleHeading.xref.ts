import { AnimeInstance } from "animejs";
import { EASING } from "../../core/animation/constants";
import { Xref } from "../../core/animation/Xref";
import { createAnimation } from "../../core/animation/runners";

export class $TitleHeading extends Xref {
    ///
    public static initXref(id: string): $TitleHeading {
        return new $TitleHeading(id);
    }

    ///
    public static get xref(): $TitleHeading {
        return Xref.check($TitleHeading._xref);
    }

    ///
    public readonly fadeIn: AnimeInstance;

    ///
    private static _xref: $TitleHeading | null = null;
    private constructor(id: string) {

        
        super(id);
        this.fadeIn = createAnimation({
            targets: this.idSelector,
            opacity: [0, 1],
            duration: 500,
            easing: EASING.easeInQuad,
            autoplay: false,
        });
    }
}