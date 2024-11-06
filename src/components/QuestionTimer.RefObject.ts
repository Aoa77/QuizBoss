import { Dispatch, SetStateAction } from "react";
import { AppSettings } from "../app/App.settings";
import {
    Duration,
    Ease,
    Fade,
    Scale,
} from "../libs/anime-context/AnimeContext.constants";
import { AnimeRef } from "../libs/anime-context/AnimeRef";
import { FlowContext } from "../libs/flow-context/FlowContext";
import { Lazy } from "../libs/friendlies/Lazy";
import { Anime } from "../models/Anime";
import { QuizState } from "../models/QuizState";

export enum TimerStatus {
    None = "None",
    Reset = "Reset",
    Running = "Running",
    Stopped = "Stopped",
    TimedOut = "TimedOut",
}
export class QuestionTimerRefObject {

    private _status: TimerStatus = TimerStatus.None;
    public get status(): TimerStatus {
        return this._status;
    }


    public reset() {
        const animation = this._animation.instance;
        animation.scale = Scale.zero;
        animation.opacity = Fade.one;
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

    public stop() {
        this._status = TimerStatus.Stopped;
    }

    private _secondsRemaining: number = 0;
    private _shrinkage: Promise<void> | null = null;

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
            duration: 0.25 * Duration.oneSecond,
        });

        this._shrinkage = anim.run({
            scale: [1.5, 1],
            duration: settings.timerSeconds * Duration.oneSecond,
            easing: Ease.linear,
        });
        console.debug(this._shrinkage);
    }

    private async pulse() {
        if (this.status === TimerStatus.Stopped) {
            return;
        }

        await this.pulseAnimation();
        if (this.status.toString() === TimerStatus.Stopped) {
            return;
        }

        if (--this._secondsRemaining < 0) {
            this._status = TimerStatus.TimedOut;
            return;
        }

        if (this.status.toString() === TimerStatus.Stopped) {
            return;
        }
        this.updateUi();

        if (this.status.toString() === TimerStatus.Stopped) {
            return;
        }
        await this.pulse();
    }

    private async pulseAnimation(): Promise<void> {
        await this._animation.instance.run({
            opacity: [1.0, 0.35],
            duration: Duration.oneSecond,
            easing: Ease.linear,
        });
    }

    private updateUi() {
        const minutes = Math.floor(this._secondsRemaining / 60);
        const seconds = this._secondsRemaining % 60;
        const text = `${minutes}:${seconds.toString().padStart(2, "0")}`;
        document.getElementById(this._animation.instance.id)!.innerText = text;
    }
}
