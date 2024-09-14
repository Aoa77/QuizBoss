import AppConfig from "./AppConfig";
import { StateController, TimeController } from "../controllers";
import { ElementController } from "../elements";

export default interface AppContext {
    config: AppConfig;
    elements: ElementController;
    states: StateController;
    time: TimeController;
}
