import AppContext from "../app/AppContext";
import AppSettings from "../app/AppSettings";
import ElementController from "../elements/ElementController";
import StateController from "../state/StateController";

export default function useAppContext(
    config: AppSettings,
    elements: ElementController,
    states: StateController,
): AppContext {
    return {
        config,
        elements,
        states,
    };
}
