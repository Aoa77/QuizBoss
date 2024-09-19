import animate from "../time/animate";
import delay from "../time/delay";
import { Duration } from "../time/Duration";
import { Multiplier } from "../time/Multiplier";
import ButtonBuilder from "./buttons/ButtonBuilder";
import ButtonElement from "./buttons/ButtonElement";
import { ButtonState } from "./buttons/ButtonState";
import ElementRefs from "./ElementRefs";

export default class ElementController {
    // public members
    public readonly guessButtons: ButtonElement[];
    public readonly refs: ElementRefs;

    constructor(refs: ElementRefs) {
        this.refs = refs;
        this.guessButtons = ButtonBuilder();
    }

    // public methods
    public async blinkButton(button: HTMLButtonElement) {
        for (let blink = 0; blink < Duration.BLINKS; blink++) {
            button.className =
                blink % 2 ? ButtonState.REVEAL : ButtonState.BLINK;
            await delay(Duration.BLINK);
        }
    }

    public clearScoreBonusStyle() {
        this.refs.scoreValue.object.current!.className = "";
    }

    public async applyScoreAward(
        score: number,
        award: number,
    ): Promise<number> {
        //
        this.refs.scoreValue.object.current!.className = "bonus";
        const target = score + award;

        for (let bonus = score + 1; bonus <= target; bonus++) {
            this.refs.scoreValue.object.current!.innerHTML = bonus.toString();
            await delay(Duration.WAIT);
        }

        return target;
    }

    public toTargetSelector(target: string): string {
        return `#${target}`;
    }

    public async fadeIn(
        target: string,
        multiplier: Multiplier = Multiplier.x1,
    ) {
        await this.fade(target, 1, multiplier);
    }

    public async fadeOut(
        target: string,
        multiplier: Multiplier = Multiplier.x1,
    ) {
        await this.fade(target, 0, multiplier);
    }

    public async fade(
        target: string,
        opacity: number,
        multiplier: Multiplier = Multiplier.x1,
    ) {
        const easing = "linear";
        const targets = this.toTargetSelector(target);
        await animate({ targets, opacity, easing }, Duration.FADE, multiplier);
    }
    
    public async scaleIn(
        target: string,
        multiplier: Multiplier = Multiplier.x1,
    ) {
        await this.scale(target, 1.19, multiplier);
    }

    public async scaleOut(
        target: string,
        multiplier: Multiplier = Multiplier.x1,
    ) {
        await this.scale(target, 1.00, multiplier);
    }
    
    public async scale(
        target: string,
        scale: number,
        multiplier: Multiplier = Multiplier.x1,
    ) {
        const easing = "linear";
        const targets = this.toTargetSelector(target);
        await animate({ targets, easing, scale }, Duration.SCALE, multiplier);
    }


    // export class EasingFunctions {
    //     public static easeOutElastic(params: EaseOutElasticParams): string {
    //         return `easeOutElastic(${params.amplitude}, ${params.period})`;
    //     }
    //     public static easeInElastic(params: EaseOutElasticParams): string {
    //         return `easeInElastic(${params.amplitude}, ${params.period})`;
    //     }
    // }
}
    

