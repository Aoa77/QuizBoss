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
    const stateContext = useAppState();
    const elementContext = useElements(config, stateContext);
    const context = useAppContext(config, elementContext, stateContext);

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
