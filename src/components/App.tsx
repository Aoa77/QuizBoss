import "../styles";
import { Config } from "../models";

import {
    GuessButtons,
    LoadingSpinner,
    QuestionHeading,
    QuestionImage,
    ScoreDisplay,
    TitleHeading,
    ProgressDisplay,
} from "./AppChildren";

import {
    useAppState,
    useElements,
    useAppContext,
    useEventRouter,
} from "../hooks";

export default function App(config: Config) {
    const stateHook = useAppState();
    const elementsHook = useElements(config, stateHook);
    const context = useAppContext(config, elementsHook, stateHook);

    useEventRouter(context);

    return (
        <main>
            <TitleHeading {...context} />
            <LoadingSpinner {...context} />
            <QuestionImage {...context} />
            <QuestionHeading {...context} />
            <GuessButtons {...context} />
            <ScoreDisplay {...context} />
            <ProgressDisplay {...context} />
        </main>
    );
}
