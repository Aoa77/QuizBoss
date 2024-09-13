import { AppConfig, AppContext } from "../app";
import { ElementController, StateController, TimeController } from "../controllers";

export default function useContextController(
    config: AppConfig,
    elementController: ElementController,
    stateController: StateController,
    timeController: TimeController,
): AppContext {
    return {
        config,
        elements: elementController,
        states: stateController,
        time: timeController,
    };
}
