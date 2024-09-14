import { AppConfig } from "../app";
import { ButtonBuilder, ButtonElement, ButtonState } from "../buttons";
import { StateController, TimeController } from "../controllers";
import { ElementEnvelopes, ElementRefs } from "../elements";
import ElementAnimation from "./ElementAnimation";
import ElementAnimations from "./ElementAnimations";

export default class ElementController {
    // public members
    public readonly animate: ElementAnimations;
    public readonly guessButtons: ButtonElement[];
    public readonly refs: ElementRefs;

    // private members
    private readonly time: TimeController;

    constructor(
        config: AppConfig,
        envs: ElementEnvelopes,
        refs: ElementRefs,
        states: StateController,
        time: TimeController,
    ) {
        this.guessButtons = ButtonBuilder(config, states);
        this.refs = refs;
        this.time = time;

        this.animate = {
            appVersion: new ElementAnimation(
                envs.appVersion,
                refs.appVersion.current,
                time,
            ),
            best: new ElementAnimation(envs.best, refs.best.current, time),
            buttons: new ElementAnimation(
                envs.buttons,
                refs.buttons.current,
                time,
            ),
            image: new ElementAnimation(envs.image, refs.image.current, time),
            loading: new ElementAnimation(
                envs.loading,
                refs.loading.current,
                time,
            ),
            progress: new ElementAnimation(
                envs.progress,
                refs.progress.current,
                time,
            ),
            question: new ElementAnimation(
                envs.question,
                refs.question.current,
                time,
            ),
            score: new ElementAnimation(envs.score, refs.score.current, time),
            scoreArea: new ElementAnimation(
                envs.scoreArea,
                refs.scoreArea.current,
                time,
            ),
            title: new ElementAnimation(envs.title, refs.title.current, time),
        };
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
        // this.refs.score.current!.innerHTML = "";
        this.refs.scoreArea.current!.className = "";
    }

    public async scoreUpdate(
        score: number,
        award: number,
        correctButton: HTMLButtonElement,
    ): Promise<number> {
        //
        await this.time.scoreUpdate();
        correctButton!.innerHTML += " +" + award.toString();
        await this.time.scoreUpdate();

        //
        this.refs.scoreArea.current!.className = "bonus";

        const target = score + award;
        for (let bonus = score + 1; bonus <= target; bonus++) {
            this.refs.scoreArea.current!.innerHTML = bonus.toString();
            await this.time.scoreUpdate();
        }
        return target;
    }
}
