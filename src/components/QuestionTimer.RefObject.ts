import { AppSettings } from "../app/App.settings";
import { Duration, Ease, Fade } from "../libs/anime-context/AnimeContext.constants";
import { AnimeRef } from "../libs/anime-context/AnimeRef";
import { FlowContext } from "../libs/flow-context/FlowContext";
import { Lazy } from "../libs/friendlies/Lazy";
import { Anime } from "../models/Anime";
import { QuizState } from "../models/QuizState";

export class QuestionTimerRefObject {
    public isExpired() {
        return this._secondsRemaining <= 0;
    }
    private _timer: number | null = null;
    private _secondsRemaining: number = 0;

    private readonly _animation: Lazy<AnimeRef> = new Lazy<AnimeRef>(() => {
        return Anime.QuestionTimer;
    });

    private readonly _appSettings: Lazy<AppSettings> = new Lazy<AppSettings>(() => {
        const [state] = FlowContext.current<QuizState>();
        const { settings } = state;
        return settings;
    });

    private readonly _duration: Lazy<number> = new Lazy<number>(() => {
        return this._appSettings.instance.oneTickAtSpeed;
    });

    public reset() {
        if (this._timer) {
            throw new Error("Timer.reset() error: Can't reset timer while running.");
        }
        const { timerSeconds } = this._appSettings.instance;
        this._secondsRemaining = timerSeconds;
        this.updateUi();
    }

    public async countdownTick() {
        const anim = this._animation.instance;
        const settings = this._appSettings.instance;
        await anim.run({
            scale: [0, 1.25],
            duration: 0.25 * Duration.oneSecond,
        }).then(() => {
            anim.run({
                scale: [1.25, 1],
                duration: 0.5 * settings.timerSeconds * Duration.oneSecond,
                easing: Ease.linear,
            });
        });
    }

    public async fadeIn() {
        const duration = this._duration.instance;
        await this._animation.instance.run({
            opacity: Fade.in,
            delay: 1.5 * duration,
            duration,
            easing: Ease.linear,
        });
    }

    public async pulse() {
        await this._animation.instance.run({
            opacity: [1.0, 0.5],
            duration: 0.25 * Duration.oneSecond,
            endDelay: 0.25 * Duration.oneSecond,
            easing: Ease.linear,
        });
    }

    public async start() {
        if (this._timer) {
            return;
        }
        if (this._secondsRemaining <= 0) {
            this._secondsRemaining = 0;
            return;
        }
        this.pulse();

        this._timer = setInterval(() => {
            this._secondsRemaining--;
            this.updateUi();
            const task = this.pulse();
            if (this._secondsRemaining <= 0) {
                clearInterval(this._timer!);
                this._secondsRemaining = 0;
                task.then(() => {
                    this._animation.instance.run({
                        opacity: [0.5, 0.25],
                        duration: 0.5 * Duration.oneSecond,
                        easing: Ease.linear,
                    });
                });
            }
        }, Duration.oneSecond);
    }

    public stop() {
        if (!this._timer) {
            return;
        }
        clearInterval(this._timer);
        this._timer = null;
    }

    public get secondsRemaining(): number {
        return this._secondsRemaining;
    }

    private updateUi() {
        const minutes = Math.floor(this._secondsRemaining / 60);
        const seconds = this._secondsRemaining % 60;
        const text = `${minutes}:${seconds.toString().padStart(2, "0")}`;
        document.getElementById(this._animation.instance.id)!.innerText = text;
    }
}
