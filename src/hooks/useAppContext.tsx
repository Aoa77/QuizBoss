import AppContext from "../app/AppContext";
import ElementController from "../elements/ElementController";
import StateController from "../state/StateController";

export default function useAppContext(
    elements: ElementController,
    states: StateController,
): AppContext {
    return {
        elements,
        states,
    };
}
