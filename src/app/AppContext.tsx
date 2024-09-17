import ElementController from "../elements/ElementController";
import StateController from "../state/StateController";

export default interface AppContext {
    elements: ElementController;
    states: StateController;
}
