import { QuizState } from "../models/QuizState";
import { ELEMENT } from "../constants/ELEMENT";
import { createXref } from "../../core/animation/dom/createXref";
import { DarkTheme, LightTheme, Themes } from "../styles/themes";
import { applyTheme } from "../models/AppSettings";
import { flow } from "../../core/context/flow";

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
    const theme =
        state.settings.theme.NAME === Themes.Light /////
            ? DarkTheme
            : LightTheme;
    applyTheme(theme);
    setState({ ...state, settings: { ...state.settings, theme } });
}
