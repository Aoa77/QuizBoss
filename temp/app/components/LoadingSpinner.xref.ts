import { AnimeInstance } from "animejs";
import { createAnimation } from "../../core/animation/runners";
import { wait } from "../../core/animation/wait";
import { RadArray } from "./LoadingSpinner.constants";
// import { EASING } from "../../core/animation/constants";
// import { ELEMENT } from "../constants/ELEMENT";
// import { Xelement } from "../../core/animation/dom/Xelement";
import { Xref } from "../../core/animation/Xref";


export class $LoadingSpinner extends Xref {
    ///
    public static initXref(id: string): $LoadingSpinner {
        return new $LoadingSpinner(id);
    }

    ///
    public static get xref(): $LoadingSpinner {
        return Xref.check($LoadingSpinner._xref);
    }

    ///
    public readonly fadeIn: AnimeInstance;

    ///
    private static _xref: $LoadingSpinner | null = null;
    private constructor(id: string) {
        super(id);
        this.fadeIn = createAnimation({
            targets: this.idSelector,
            opacity: [0, 1],
            duration: 500,
            // EASING.easeInQuad,
            autoplay: false,
        });
    }
}



export class LoadingAnimation {
    public static async start() {
        await LoadingAnimation.instance.start();
    }

    public static async stop() {
        await LoadingAnimation.instance.stop();
    }

    private static _instance: LoadingAnimation | null = null;
    private static get instance(): LoadingAnimation {
        return (LoadingAnimation._instance ??= new LoadingAnimation());
    }

    public static readonly BALLS: number = 3;
    private static readonly STAGGER_DELAY: number = 200;

    private readonly _ballAnimations: AnimeInstance[] = [];
    private readonly _resetBallAnimation: AnimeInstance;
  //  private readonly _div: Xelement<HTMLDivElement>;

    constructor() {
        const delay = 25;
        const duration = 1000;
        const endDelay = 1000;
        const easing = "";//EASING.easeInOutBounce;

        for (let i = 1; i <= LoadingAnimation.BALLS; i++) {
            this._ballAnimations.push(
                createAnimation({
                    targets: `section#loading > svg > circle:nth-of-type(${i})`,
                    keyframes: [{ r: RadArray[0] }, { delay, r: RadArray[1] }],
                    loop: true,
                    duration,
                    endDelay,
                    easing,
                    autoplay: false,
                }),
            );
        }

        this._resetBallAnimation = createAnimation({
            targets: `section#loading > svg > circle`,
            r: RadArray[1],
            loop: false,
            duration: 0,
            endDelay: 0,
            // EASING.linear,
            autoplay: false,
        });

      //  this._div = xref.divs(ELEMENT.LoadingSpinner_fill)[0];
    }

    public async start() {
       // this._div.fadeIn({ duration: 500 });
        
        for (let i = 0; i < this._ballAnimations.length; i++) {
            this._ballAnimations[i].restart();
            await wait(LoadingAnimation.STAGGER_DELAY);
        }
        await wait(LoadingAnimation.STAGGER_DELAY * 8);
    }
    
    public async stop() {
       // this._div.fadeOut({ duration: 200 });
        await Promise.all(this._ballAnimations.map((a) => a.pause()));
        await this._resetBallAnimation.play();
    }
}
