import { AppConfig, AppContext } from "../app";
import { ElementController } from "../elements";
import { StateController } from "../state";

export default function useAppContext(
    config: AppConfig,
    elements: ElementController,
    states: StateController,
): AppContext {
    return {
        config,
        elements,
        states,
    };
}
