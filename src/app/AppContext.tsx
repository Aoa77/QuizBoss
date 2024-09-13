import AppConfig from "./AppConfig";
import {
    ElementController,
    StateController,
    TimeController,
} from "../controllers";

export default interface AppContext {
    config: AppConfig;
    elements: ElementController;
    states: StateController;
    time: TimeController;
}
