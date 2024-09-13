import { ButtonState } from "../enums";
import { Config } from "../app";
import { ElementRefs, ButtonElement, ButtonBuilder } from "../elements";
import StateController from "./StateController";
import TimeController from "./TimeController";

export default class ElementController {
    // public members
    public readonly refs: ElementRefs;
    public readonly guessButtons: ButtonElement[];

    // private members
    private readonly timeController: TimeController;

    constructor(
        config: Config,
        refs: ElementRefs,
        stateController: StateController,
        timeController: TimeController,
    ) {
        this.refs = refs;
        this.guessButtons = ButtonBuilder(config, stateController);
        this.timeController = timeController;
    }

    // public methods
    public async blinkButton(button: HTMLButtonElement) {
        for (let blink = 0; blink < this.timeController.blinks(); blink++) {
            button.className =
                blink % 2 ? ButtonState.REVEAL : ButtonState.BLINK;
            await this.timeController.blink();
        }
    }

    public clearScoreMarks() {
        this.refs.scoreMark.current!.innerHTML = "";
        this.refs.scoreMark.current!.className = "";
    }

    public hideAppVersion() {
        this.hideElement(this.refs.appVersion.current);
    }

    public hideButtonsSection() {
        this.hideElement(this.refs.buttonsSection.current);
    }

    public hideImageSection() {
        this.hideElement(this.refs.imageSection.current);
    }
    
    public hideLoadingSection() {
        this.hideElement(this.refs.loadingSection.current);
    }

    public hideProgressSection() {
        this.hideElement(this.refs.progressSection.current);
    }

    public hideScoreSection() {
        this.hideElement(this.refs.scoreSection.current);
    }

    public hideSpinner() {
        this.hideLoadingSection();
        const spinner = this.refs.loadingSection.current!.children[0];
        spinner.className = "";
    }

    public hideTitleHeading() {
        this.hideElement(this.refs.titleHeading.current);
    }

    public hideQuestionHeading() {
        this.hideElement(this.refs.questionHeading.current);
    }

    public async scoreUpdate(award: number, correctButton: HTMLButtonElement) {
        correctButton!.innerHTML += " +" + award.toString();
        this.refs.scoreMark.current!.innerHTML = "+" + award.toString();
        this.refs.scoreMark.current!.className = "fadeOut";
        await this.timeController.scoreUpdate();
    }

    public showAppVersion() {
        this.showElement(this.refs.appVersion.current);
    }

    public showButtonsSection() {
        this.showElement(this.refs.buttonsSection.current);
    }

    public showImageSection() {
        this.showElement(this.refs.imageSection.current);
    }

    public showLoadingSection() {
        this.showElement(this.refs.loadingSection.current);
    }

    public showProgressSection() {
        this.showElement(this.refs.progressSection.current);
    }

    public showScoreSection() {
        this.showElement(this.refs.scoreSection.current);
    }

    public async showSpinner() {
        const spinner = this.refs.loadingSection.current!.children[0];
        spinner.className = "spinner";
        this.showLoadingSection();
        await this.timeController.showSpinner();
    }

    public showTitleHeading() {
        this.showElement(this.refs.titleHeading.current);
    }

    public showQuestionHeading() {
        this.showElement(this.refs.questionHeading.current);
    }

    // private methods
    private hideElement(element: HTMLElement | null | undefined) {
        if (!element) {
            return;
        }
        element.classList.add("hidden");
    }

    private showElement(element: HTMLElement | null | undefined) {
        if (!element) {
            return;
        }
        element.classList.remove("hidden");
    }
}
