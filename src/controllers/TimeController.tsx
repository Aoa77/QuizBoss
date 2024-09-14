import anime from "animejs";
import { delay, randomInt } from "../utilities";
import Envelope from "../utilities/Envelope";

export default class TimeController {
    ///
    public async anime(params: anime.AnimeParams) {
        anime(params);
        const { duration } = params;
        if (typeof duration !== "number") {
            throw new Error("Invalid duration");
        }
        await delay(duration);
    }

    public sustain(envelope: Envelope) {
        return delay(envelope.sustain);
    }

    public blink() {
        return delay(150);
    }

    public blinks(): number {
        return 16;
    }

    public demoWait() {
        return delay(randomInt(150, 450));
    }

    public fadeDuration() {
        return 250;
    }

    public throttle() {
        return delay(25);
    }

    public pause() {
        return delay(1200);
    }

    public scoreUpdate() {
        return delay(250);
    }

    public poll() {
        return delay(50);
    }
}
