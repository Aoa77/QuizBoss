import { Dispatch, SetStateAction } from "react";
import { AppSettings } from "../app/App.settings";
import { $ease, $time } from "../libs/anime-context/AnimeContext.constants";
import { AnimeRef } from "../libs/anime-context/AnimeRef";
import { FlowContext } from "../libs/flow-context/FlowContext";
import { Lazy } from "../libs/friendlies/Lazy";
import { Anime } from "../models/Anime";
import { QuizState } from "../models/QuizState";
import { Task } from "../libs/friendlies/Task";

export enum TimerStatus {
    None = "None",
    Reset = "Reset",
    Running = "Running",
    Stopped = "Stopped",
    StopRequested = "StopRequested",
    TimedOut = "TimedOut",
}

export class QuestionTimerRefObject {
    private _status: TimerStatus = TimerStatus.None;
    public get status(): TimerStatus {
        return this._status;
    }

    public reset() {
        const animation = this._animation.instance;
        animation.scale = 0;
        animation.opacity = 1;
        const { timerSeconds } = this._settings.instance;
        this._secondsRemaining = timerSeconds;
        this.updateUi();
        this._status = TimerStatus.Reset;
    }

    public get secondsRemaining(): number {
        return this._secondsRemaining < 1 ? 0 : this._secondsRemaining;
    }

    public async start() {
        this._status = TimerStatus.Running;
        await this.popIntoExistance();
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

    private _secondsRemaining: number = 0;
    private readonly _animation: Lazy<AnimeRef> = new Lazy<AnimeRef>(() => {
        return Anime.QuestionTimer;
    });

    private readonly _context: Lazy<[QuizState, Dispatch<SetStateAction<QuizState>>]> =
        new Lazy<[QuizState, Dispatch<SetStateAction<QuizState>>]>(() => {
            return FlowContext.current<QuizState>();
        });

    private readonly _settings: Lazy<AppSettings> = new Lazy<AppSettings>(() => {
        const [state] = this._context.instance;
        const { settings } = state;
        return settings;
    });

    private async popIntoExistance() {
        const anim = this._animation.instance;
        const settings = this._settings.instance;
        await anim.run({
            scale: [0, 1.5],
            duration: $time.seconds(0.25),
        });

        anim.run({
            scale: [1.5, 1.0],
            duration: $time.seconds(settings.timerSeconds),
            easing: $ease.linear,
        });
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

    private shouldStopTimer(): boolean {
        if (this.status === TimerStatus.StopRequested) {
            this._status = TimerStatus.Stopped;
        }
        return (
            this.status === TimerStatus.Stopped || this.status === TimerStatus.TimedOut
        );
    }

    private async pulseAnimation(): Promise<void> {
        await this._animation.instance.run({
            opacity: [1.0, 0.25],
            duration: $time.second,
            easing: $ease.linear,
        });
    }

    private updateUi() {
        const minutes = Math.floor(this._secondsRemaining / 60);
        const seconds = this._secondsRemaining % 60;
        const text = `${minutes}:${seconds.toString().padStart(2, "0")}`;
        document.getElementById(this._animation.instance.id)!.innerText = text;
    }
}
