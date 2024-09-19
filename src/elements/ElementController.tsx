import delay from "../time/delay";
import { Duration } from "../time/Duration";
import fade from "../time/fade";
import { Multiplier } from "../time/Multiplier";
import { scale } from "../time/scale";
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


    public async fadeIn(
        target: string,
        multiplier: Multiplier = Multiplier.x1,
    ) {
        await fade(this.toTargetSelector(target), 1, multiplier);
    }

    public async fadeOut(
        target: string,
        multiplier: Multiplier = Multiplier.x1,
    ) {
        await fade(this.toTargetSelector(target), 0, multiplier);
    }
    
    public async scaleIn(
        target: string,
        multiplier: Multiplier = Multiplier.x1,
    ) {
        await scale(this.toTargetSelector(target), 1.3, multiplier);
    }

    public async scaleOut(
        target: string,
        multiplier: Multiplier = Multiplier.x1,
    ) {
        await scale(this.toTargetSelector(target), 1.0, multiplier);
    }

}