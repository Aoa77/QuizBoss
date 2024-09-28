import anime from "animejs";
import { AnimeParams } from "animejs";

let _globalSpeedSet: boolean = false;
let _globalSpeed: number = 100;

export function setGlobalSpeed(speed: number): void {
    if (_globalSpeedSet) {
        throw new Error("Global anime multipliers have already been set.");
    }
    _globalSpeed = speed;
    _globalSpeedSet = true;
}

export function applySpeed(value: number, speed: number): number {
    return value / (speed / 100);
}

export function wait(duration: number, speed: number = 100): Promise<void> {
    duration = applySpeed(duration, speed);
    duration = applySpeed(duration, _globalSpeed);
    return new Promise((resolve) => setTimeout(resolve, duration));
}

export function runAnimation(xp: AnimeParams): Promise<void> {
    ////
    if (typeof xp.duration === "number") {
        xp.duration = applySpeed(xp.duration, _globalSpeed);
    }
    ////
    return new Promise((resolve) => {
        xp.complete = () => {
            resolve();
        };
        anime(xp);
    });
}

