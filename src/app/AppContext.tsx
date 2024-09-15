import AppSettings from "./AppSettings";
import { ElementController } from "../elements";
import { StateController } from "../state";

export default interface AppContext {
    config: AppSettings;
    elements: ElementController;
    states: StateController;
}
