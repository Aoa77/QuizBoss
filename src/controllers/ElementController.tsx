import { AppConfig } from "../app";
import { ButtonBuilder, ButtonElement, ButtonState } from "../buttons";
import {
    Duration,
    PropertyAnimation,
    StateController,
    TimeController,
} from ".";
import { ElementRefs } from "../elements";

export default class ElementController {
    // public members
    public readonly guessButtons: ButtonElement[];
    public readonly refs: ElementRefs;

    // private members
    private readonly time: TimeController;

    constructor(
        config: AppConfig,
        refs: ElementRefs,
        states: StateController,
        time: TimeController,
    ) {
        this.refs = refs;
        this.time = time;
        this.guessButtons = ButtonBuilder(config, states);
    }

    // public methods
    public async blinkButton(button: HTMLButtonElement) {
        for (let blink = 0; blink < this.time.blinks(); blink++) {
            button.className =
                blink % 2 ? ButtonState.REVEAL : ButtonState.BLINK;
            await this.time.blink();
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
        await this.time.delay({});
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

    public async fadeIn(target: string, duration: Duration) {
        await this.fade(target, 1, duration);
    }

    public async fadeOut(target: string, duration: Duration) {
        await this.fade(target, 0, duration);
    }

    public async fade(target: string, opacity: number, duration: Duration) {
        await this.time.animate(
            {
                targets: this.toTargetSelector(target),
                easing: "linear",
                opacity,
            },
            duration,
        );
    }

    public async scaleIn(target: string, duration: Duration) {
        await this.scale(target, 1.2, duration);
    }

    public async scaleOut(target: string, duration: Duration) {
        await this.scale(target, 1.0, duration);
    }

    public async scale(target: string, scale: number, duration: Duration) {
        await this.time.animate(
            {
                targets: this.toTargetSelector(target),
                scale,
            },
            duration,
        );
    }
}
