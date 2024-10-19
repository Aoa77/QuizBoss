import anime from "animejs";
import { Animatable, Animation, AnimeInstance, AnimeParams } from "animejs";

export class AsyncAnimation implements AnimeInstance {
    private readonly _instance: AnimeInstance;
    public constructor(params: AnimeParams) {
        this._instance = anime(params);
    }

    public startAsync(): Promise<void> {
        return new Promise((resolve) => {
            this._instance.finished.then(() => {
                resolve();
            });
            this.play();
        });
    }

    play(): void {
        this._instance.play();
    }
    pause(): void {
        this._instance.pause();
    }
    restart(): void {
        this._instance.restart();
    }
    reverse(): void {
        this._instance.reverse();
    }
    seek(time: number): void {
        this._instance.seek(time);
    }
    tick(time: number): void {
        this._instance.tick(time);
    }
    get began(): boolean {
        return this._instance.began;
    }
    get paused(): boolean {
        return this._instance.paused;
    }
    get completed(): boolean {
        return this._instance.completed;
    }
    get finished(): Promise<void> {
        return this._instance.finished;
    }
    get autoplay(): boolean {
        return this._instance.autoplay;
    }
    get currentTime(): number {
        return this._instance.currentTime;
    }
    get delay(): number {
        return this._instance.delay;
    }
    get direction(): string {
        return this._instance.direction;
    }
    get duration(): number {
        return this._instance.duration;
    }
    get loop(): number | boolean {
        return this._instance.loop;
    }
    get timelineOffset(): number {
        return this._instance.timelineOffset;
    }
    get progress(): number {
        return this._instance.progress;
    }
    get remaining(): number {
        return this._instance.remaining;
    }
    get reversed(): boolean {
        return this._instance.reversed;
    }
    get animatables(): readonly Animatable[] {
        return this._instance.animatables;
    }
    get animations(): readonly Animation[] {
        return this._instance.animations;
    }
}