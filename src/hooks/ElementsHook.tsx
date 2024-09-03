import { Config } from "../models";
import { delay, randomInt } from "../utilities";
import { ElementRefs, ButtonElement, ButtonBuilder } from "../elements";
import AppStateHook from "./AppStateHook";

export default class ElementsHook {
    public refs: ElementRefs;
    public guessButtons: ButtonElement[];

    constructor(config: Config, stateHook: AppStateHook, refs: ElementRefs) {
        this.refs = refs;
        this.guessButtons = ButtonBuilder(config, stateHook);
    }

    public demoWait() {
        return delay(randomInt(300, 2700));
    }

    public loadThrottle() {
        return delay(25);
    }

    public spinnerPoll() {
        return delay(50);
    }

    public resultPause() {
        return delay(1100);
    }

    public async scoreUpdate(award: number, correctButton: HTMLButtonElement) {
        correctButton!.innerHTML += " +" + award.toString();
        await delay(100);
        this.refs.scoreMark.current!.innerHTML = "+" + award.toString();
        this.refs.scoreMark.current!.className = "fadeOut";
    }

    public hideSpinner() {
        this.hideLoadingSection();
        const spinner = this.refs.loadingSection.current!.children[0];
        spinner.className = "";
    }

    public async showSpinner() {
        const spinner = this.refs.loadingSection.current!.children[0];
        spinner.className = "spinner";
        this.showLoadingSection();
        return delay(800);
    }

    public clearScoreMarks() {
        this.refs.scoreMark.current!.innerHTML = "";
        this.refs.scoreMark.current!.className = "";
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

    public hideTitleHeading() {
        this.hideElement(this.refs.titleHeading.current);
    }

    public hideQuestionHeading() {
        this.hideElement(this.refs.questionHeading.current);
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

    public showTitleHeading() {
        this.showElement(this.refs.titleHeading.current);
    }

    public showQuestionHeading() {
        this.showElement(this.refs.questionHeading.current);
    }

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
