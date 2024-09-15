import { AppConfig } from "../app";
import { ButtonBuilder, ButtonElement, ButtonState } from "../buttons";
import { StateController } from "../state";
import { ElementRef, ElementRefs } from ".";
import { delay, Duration, $D, animate } from "../time";

export default class ElementController {
    // public members
    public readonly guessButtons: ButtonElement[];
    public readonly refs: ElementRefs;

    constructor(config: AppConfig, states: StateController, refs: ElementRefs) {
        this.refs = refs;
        this.guessButtons = ButtonBuilder(config, states);
    }

    // public methods
    public async blinkButton(button: HTMLButtonElement) {
        for (let blink = 0; blink < $D.BLINKS; blink++) {
            button.className =
                blink % 2 ? ButtonState.REVEAL : ButtonState.BLINK;
            await delay({ value: $D.BLINK });
        }
    }

    public clearScoreBonusStyle() {
        this.refs.scoreValue.object.current!.className = "";
    }

    public async scoreUpdate(
        score: number,
        award: number,
        correctButton: HTMLButtonElement,
    ): Promise<number> {
        //
        await delay({ value: $D.WAIT });
        // correctButton!.innerHTML += " +" + award.toString();
        // await this.time.transition();

        // //
        // this.refs.scoreValue.object.current!.className = "bonus";

        const target = score + award;
        // for (let bonus = score + 1; bonus <= target; bonus++) {
        //     this.refs.scoreValue.object.current!.innerHTML = bonus.toString();
        //     await this.time.transition();
        // }
        return target;
    }

    private toTargetSelector(target: string): string {
        return `#${target}`;
    }

    public async fadeIn(
        target: string,
        opacity: number = 1,
        multiplier: number = 1,
    ) {
        await this.fade(target, opacity, multiplier);
    }

    public async fadeOut(
        target: string,
        opacity: number = 0,
        multiplier: number = 1,
    ) {
        await this.fade(target, opacity, multiplier);
    }

    public async fade(target: string, opacity: number, multiplier: number = 1) {
        const targets = this.toTargetSelector(target);
        await animate({ targets, opacity }, { value: $D.FADE, multiplier });
    }

    public async scaleIn(
        target: string,
        scale: number = 1.2,
        multiplier: number = 1,
    ) {
        await this.scale(target, scale, multiplier);
    }

    public async scaleOut(
        target: string,
        scale: number = 1.0,
        multiplier: number = 1,
    ) {
        await this.scale(target, scale, multiplier);
    }

    public async scale(target: string, scale: number, multiplier: number = 1) {
        const targets = this.toTargetSelector(target);
        await animate({ targets, scale }, { value: $D.SCALE, multiplier });
    }
}
