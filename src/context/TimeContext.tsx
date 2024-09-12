import { delay, randomInt } from "../utilities";

export default class TimeContext {
    public blink() {
        return delay(150);
    }
    public blinks(): number {
        return 16;
    }

    public demoWait() {
        return delay(randomInt(150, 450));
    }

    public loadThrottle() {
        return delay(25);
    }

    public resultPause() {
        return delay(1200);
    }

    public scoreUpdate() {
        return delay(700);
    }

    public showSpinner() {
        return delay(800);
    }

    public spinnerPoll() {
        return delay(50);
    }
}
