import anime from "animejs";
import { delay, randomInt } from "../utilities";
import Duration from "./Duration";

const DEFAULT_DURATION = 250;
export default class TimeController {
    ///
    public async animate(params: anime.AnimeParams, duration: Duration) {
        duration.value ??= DEFAULT_DURATION;
        duration.multiplier ??= 1;
        params.duration = duration.value * duration.multiplier;
        anime(params);
        await this.delay({ value: params.duration });
    }

    public blink() {
        return this.delay({ value: 150 });
    }

    public blinks(): number {
        return 16;
    }

    public delay(params?: Duration) {
        params ??= {};
        params.value ??= DEFAULT_DURATION;
        params.multiplier ??= 1;
        return delay(params.value * params.multiplier);
    }

    public demoWait() {
        return this.delay({ value: randomInt(150, 450) });
    }

    public throttle() {
        return this.delay({ value: 25 });
    }

    public poll() {
        return this.delay({ value: 50 });
    }
}
