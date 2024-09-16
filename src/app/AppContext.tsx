import ElementController from "../elements/ElementController";
import StateController from "../state/StateController";
import AppSettings from "./AppSettings";

export default interface AppContext {
    config: AppSettings;
    elements: ElementController;
    states: StateController;
}
