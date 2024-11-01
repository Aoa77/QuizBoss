import { AppSettings } from "../app/App.settings";
import { Duration, Ease } from "../libs/anime-context/AnimeContext.constants";
import { FlowContext } from "../libs/flow-context/FlowContext";
import { Lazy } from "../libs/friendlies/Lazy";
import { Anime } from "./Anime";
import { QuizState } from "./QuizState";

export class Timer {
    private static _timer: number | null = null;
    private static _secondsRemaining: number = 0;

    private static readonly _appSettings: Lazy<AppSettings> = new Lazy<AppSettings>(
        () => {
            const [state] = FlowContext.current<QuizState>();
            const { settings } = state;
            return settings;
        },
    );

    public static reset() {
        if (this._timer) {
            throw new Error("Timer.reset() error: Can't reset timer while running.");
        }

        const { timerSeconds } = this._appSettings.instance;
        this._secondsRemaining = timerSeconds;
        this.updateUi();
    }

    public static async pulse() {
        await Anime.QuestionTimer.run({
            opacity: [1.00, 0.55],
            duration: 0.25 * Duration.oneSecond,
            easing: Ease.linear,
        });
    }

    public static start() {
        if (this._timer) {
            throw new Error("Timer.start() error: Timer already running.");
        }
        this._timer = setInterval(() => {
            this.pulse();
            this._secondsRemaining--;
            this.updateUi();
            if (this._secondsRemaining <= 0) {
                clearInterval(this._timer!);
            }
        }, Duration.oneSecond);
    }

    public static stop() {
        if (!this._timer) {
            return;
        }
        clearInterval(this._timer);
        this._timer = null;
    }

    public static get secondsRemaining(): number {
        return this._secondsRemaining;
    }

    private static updateUi() {
        const minutes = Math.floor(this._secondsRemaining / 60);
        const seconds = this._secondsRemaining % 60;
        const text = `${minutes}:${seconds.toString().padStart(2, "0")}`;
        document.getElementById(Anime.QuestionTimer.id)!.innerText = text;
    }
}
