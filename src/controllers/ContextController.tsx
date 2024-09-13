import { Config } from "../app";
import StateController from "./StateController";
import ElementController from "./ElementController";
import TimeController from "./TimeController";

export default interface ContextController {
    config: Config;
    elements: ElementController;
    stateController: StateController;
    time: TimeController;
}
