import { Config } from "../app";
import {
    ContextController,
    ElementController,
    StateController,
    TimeController,
} from "../controllers";

export default function useContextController(
    config: Config,
    elementController: ElementController,
    stateController: StateController,
    timeController: TimeController,
): ContextController {
    return {
        config,
        elements: elementController,
        stateController: stateController,
        time: timeController,
    };
}
