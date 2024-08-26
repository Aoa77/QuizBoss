import { randomInt } from "../utilities/random";
import { Elements, hideElementRef, showElementRef } from "./Elements";

export default class Delay {
    private readonly elements: Elements;
    constructor(elements: Elements) {
        this.elements = elements;
    }

    private delay(ms: number): Promise<void> {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    public demoWait() {
        return this.delay(randomInt(300, 2700));
    }

    public loadThrottle() {
        return this.delay(25);
    }

    public spinnerPoll() {
        return this.delay(50);
    }

    public resultPause() {
        return this.delay(1100);
    }
    
    public async scoreUpdate(award: number, correctButton: HTMLButtonElement) {
        correctButton!.innerHTML += " +" + award.toString();
        await this.delay(100);
        this.elements.scoreMark.current!.innerHTML = "+" + award.toString();
        this.elements.scoreMark.current!.className = "fadeOut";
    }

    public hideSpinner() {
        hideElementRef(this.elements.loadingSection);
        const spinner = this.elements.loadingSection.current!.children[0];
        spinner.className = "";
    }

    public async showSpinner() {
        const spinner = this.elements.loadingSection.current!.children[0];
        spinner.className = "spinner";
        showElementRef(this.elements.loadingSection);
        return this.delay(800);
    }
}
