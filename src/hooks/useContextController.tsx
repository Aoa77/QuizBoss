import { AppConfig, AppContext } from "../app";
import { StateController, TimeController } from "../controllers";
import { ElementController } from "../elements";

export default function useContextController(
    config: AppConfig,
    elements: ElementController,
    states: StateController,
    time: TimeController,
): AppContext {
    return {
        config,
        elements,
        states,
        time,
    };
}
