import { AnimeRef } from "./AnimeRef";
import { $ease, $time } from "./constants";
import { Lazy } from "../friendlies/Lazy";
import { Task } from "../friendlies/Task";

export enum TimerStatus {
    None = "None",
    Reset = "Reset",
    Running = "Running",
    Stopped = "Stopped",
    StopRequested = "StopRequested",
    TimedOut = "TimedOut",
}

export class Timer {
    public constructor(params: {
        animeRef: () => AnimeRef;
        timerSeconds: number;
    }) {
        this._animation = new Lazy(params.animeRef);
        this._timerSeconds = params.timerSeconds;
    }

    private readonly _animation: Lazy<AnimeRef>;
    private _secondsRemaining: number = 0;
    private _timerSeconds: number = 0;
    private _pulseScale: number = 0;

    private _status: TimerStatus = TimerStatus.None;
    public get status(): TimerStatus {
        return this._status;
    }

    public reset() {
        const animation = this._animation.instance;
        animation.immediate({ opacity: 1, scale: 0 });
        this._secondsRemaining = this._timerSeconds;
        this.updateUi();
        this._status = TimerStatus.Reset;
    }

    public get secondsRemaining(): number {
        return this._secondsRemaining < 1 ? 0 : this._secondsRemaining;
    }

    public async start() {
        if (this._status !== TimerStatus.Reset) {
            throw new Error("Timer must be reset before starting.");
        }
        this._status = TimerStatus.Running;

        ///

        const anim = this._animation.instance;
        anim.immediate({ opacity: 1, scale: 1 });
        this.updateUi();

        await anim.run({
            scale: [0, 1.5],
            duration: $time.seconds(0.25),
        });
        this._pulseScale = 1.5;
        this.pulse();
    }

    public async stop() {
        const { status } = this;
        if (
            status === TimerStatus.StopRequested ||
            status === TimerStatus.Stopped ||
            status === TimerStatus.TimedOut
        ) {
            return;
        }
        this._status = TimerStatus.StopRequested;
        while (
            this.status !== TimerStatus.Stopped &&
            this.status !== TimerStatus.TimedOut
        ) {
            await Task.delay(100);
        }
    }

    private async pulse() {
        ///
        if (this.shouldStopTimer()) {
            return;
        }

        ///
        await this.pulseAnimation();
        if (this.shouldStopTimer()) {
            return;
        }

        ///
        if (--this._secondsRemaining < 0) {
            this._status = TimerStatus.TimedOut;
            return;
        }

        ///
        this.updateUi();
        await this.pulse();
    }

    private async pulseAnimation() {
        const anim = this._animation.instance;
        anim.immediate({ opacity: 1 });
        if (this._pulseScale === 0) {
            this._pulseScale = 1.5;
        }
        const nextScale = this._pulseScale - 0.05;

        anim.run({
            scale: [this._pulseScale, nextScale],
            duration: $time.seconds(1),
            easing: $ease.linear,
        });

        await anim.run({
            opacity: [1, 0.2],
            duration: $time.seconds(1),
            easing: $ease.linear,
        });
        this._pulseScale = nextScale;
    }

    private shouldStopTimer(): boolean {
        if (this.status === TimerStatus.StopRequested) {
            this._status = TimerStatus.Stopped;
        }
        return (
            this.status === TimerStatus.Stopped ||
            this.status === TimerStatus.TimedOut
        );
    }

    private updateUi() {
        const minutes = Math.floor(this._secondsRemaining / 60);
        const seconds = this._secondsRemaining % 60;
        const text = `${minutes}:${seconds.toString().padStart(2, "0")}`;
        const el = document.getElementById(this._animation.instance.id)!;
        const top = el.getBoundingClientRect().top;
        const parentTop = el.parentElement!.getBoundingClientRect().top;
        el.style.top = `${top - parentTop}px`;
        el.innerText = text;
    }
}
