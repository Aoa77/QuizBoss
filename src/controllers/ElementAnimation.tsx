import { Envelope } from "../utilities";
import TimeController from "./TimeController";

export default class ElementAnimation {
    private readonly envelope: Envelope;
    private readonly ref: HTMLElement | null | undefined;
    private readonly time: TimeController;

    constructor(envelope: Envelope, ref: HTMLElement | null | undefined, time: TimeController) {
        this.envelope = envelope;
        this.ref = ref;
        this.time = time;
    }

    public async fadeIn() {
        await this.time.anime({
            targets: this.envelope.target,
            duration: this.envelope.fadeIn,
            easing: "linear",
            opacity: 1,
        });
    }

    public async fadeOut() {
        await this.time.anime({
            targets: this.envelope.target,
            duration: this.envelope.fadeOut,
            easing: "linear",
            opacity: 0,
        });
    }

    public async sustain() {
        await this.time.sustain(this.envelope);
    }
}
