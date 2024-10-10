import { QuizState } from "../models/QuizState";

export function ProgressDisplay(state: QuizState) {

    const { currentItemIndex, totalItems } = state;

    return (
        <>
            <div>PROGRESS:</div>
            <div>
                {currentItemIndex + 1}/{totalItems}
            </div>
        </>
    );
}
