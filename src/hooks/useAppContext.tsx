import { AppSettings, AppContext } from "../app";
import { ElementController } from "../elements";
import { StateController } from "../state";

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
