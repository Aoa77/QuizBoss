import { AppConfig, AppContext } from "../app";
import { ElementController, StateController, TimeController } from "../controllers";

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
