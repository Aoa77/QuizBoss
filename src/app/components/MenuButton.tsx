import { flow } from "../../core/context/flow";
import { EventState } from "../constants/EventState";
import { QuizState } from "../models/QuizState";
import { applyTheme, Theme } from "../styles/Theme";
import { DarkTheme } from "../styles/themes/DarkTheme";
import { LightTheme } from "../styles/themes/LightTheme";

export function MenuButton(theme: Theme) {
    return (
        <section className="menuButton">
            <button className="icon" onPointerDown={onPointerDown}>
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M17 12C17 12.5523 17.4477 13 18 13C18.5523 13 19 12.5523 19 12C19 11.4477 18.5523 11 18 11C17.4477 11 17 11.4477 17 12Z"
                        stroke={theme.iconForeground}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M11 12C11 12.5523 11.4477 13 12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12Z"
                        stroke={theme.iconForeground}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M5 12C5 12.5523 5.44772 13 6 13C6.55228 13 7 12.5523 7 12C7 11.4477 6.55228 11 6 11C5.44772 11 5 11.4477 5 12Z"
                        stroke={theme.iconForeground}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </button>
        </section>
    );
}

function onPointerDown() {
    const [state, setState] = flow<QuizState>();
    if (state.event !== EventState.AwaitInput) {
        return;
    }
    const theme =
        state.settings.theme.NAME === LightTheme.NAME /////
            ? DarkTheme
            : LightTheme;
    applyTheme(theme);
    setState({ ...state, settings: { ...state.settings, theme } });
}
