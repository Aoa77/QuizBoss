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

export class QuestionTimerRefObject {
    public get isRunning(): boolean {
        return this._isRunning;
    }

    public reset() {
        if (this.isRunning) {
            throw new Error("Timer.reset() error: Can't reset timer while running.");
        }
        const animation = this._animation.instance;
        animation.scale = Scale.zero;
        animation.opacity = Fade.one;
        const { timerSeconds } = this._appSettings.instance;
        this._secondsRemaining = timerSeconds;
        this.updateUi();
    }

    public get secondsRemaining(): number {
        return this._secondsRemaining < 1 ? 0 : this._secondsRemaining;
    }

    public async start() {
        if (this.isRunning) {
            throw new Error("Timer.start() error: Can't start timer while running.");
        }
        this._isRunning = true;
        await this.popIntoExistance();
        this.pulse();
    }

    public stop() {
        if (!this.isRunning) {
            throw new Error("Timer.stop() error: Can't stop timer while not running.");
        }
        this._isRunning = false;
    }

    private _isRunning: boolean = false;
    private _secondsRemaining: number = 0;
    private _shrinkage: Promise<void> | null = null;

    private readonly _animation: Lazy<AnimeRef> = new Lazy<AnimeRef>(() => {
        return Anime.QuestionTimer;
    });

    private readonly _appSettings: Lazy<AppSettings> = new Lazy<AppSettings>(() => {
        const [state] = FlowContext.current<QuizState>();
        const { settings } = state;
        return settings;
    });

    private async popIntoExistance() {
        const anim = this._animation.instance;
        const settings = this._appSettings.instance;
        await anim.run({
            scale: [0, 1.5],
            duration: 0.25 * Duration.oneSecond,
        });

        this._shrinkage = anim.run({
            scale: [1.5, 1],
            duration: settings.timerSeconds * Duration.oneSecond,
            easing: Ease.linear,
        });
    }

    private async pulse() {
        if (!this.isRunning) {
            return;
        }

        await this.pulseAnimation();
        if (!this.isRunning) {
            return;
        }

        if (--this._secondsRemaining < 0) {
            return;
        }

        if (!this.isRunning) {
            return;
        }
        this.updateUi();

        if (!this.isRunning) {
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

    private cancelIfStopped() {
        if (!this.isRunning) {
            console.log("222");
            throw new Error("Stopped timer detected.");
        }
    }

    private updateUi() {
        const minutes = Math.floor(this._secondsRemaining / 60);
        const seconds = this._secondsRemaining % 60;
        const text = `${minutes}:${seconds.toString().padStart(2, "0")}`;
        document.getElementById(this._animation.instance.id)!.innerText = text;
    }
}
