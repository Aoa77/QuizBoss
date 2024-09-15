import AppConfig from "./AppConfig";
import { ElementController } from "../elements";
import { StateController } from "../state";

export default interface AppContext {
    config: AppConfig;
    elements: ElementController;
    states: StateController;
}
