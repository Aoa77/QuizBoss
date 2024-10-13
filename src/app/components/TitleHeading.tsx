import { QuizState } from "../models/QuizState";
import { ELEMENT } from "../constants/ELEMENT";
import { createXref } from "../../core/animation/dom/createXref";
import { applyTheme, DarkTheme, LightTheme, ThemeNames } from "../styles/themes";
import { flow } from "../../core/context/flow";
import { EventState } from "../constants/EventState";

export function TitleHeading(state: QuizState) {
    ///
    const [title] = createXref.headings(ELEMENT.title);
    return (
        <h1
            id={title.id}
            ref={title.ref}
            className="hidden"
            onPointerDown={onPointerDown}>
            {state.quizModule?.quizData?.title ?? <>&nbsp;</>}
        </h1>
    );
}

function onPointerDown() {
    if (window.location.hostname.endsWith("use.devtunnels.ms")) {
        window.location.reload();
        return;
    }

    const [state, setState] = flow<QuizState>();
    if (state.event !== EventState.AwaitInput) {
        return;
    }
    const theme =
        state.settings.theme.NAME === ThemeNames.Light /////
            ? DarkTheme
            : LightTheme;
    applyTheme(theme);
    setState({ ...state, settings: { ...state.settings, theme } });
}
