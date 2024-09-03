import { Config } from "../models";
import AppStateHook from "./AppStateHook";
import ElementsHook from "./ElementsHook";

export default interface AppContext {
    config: Config;
    elementsHook: ElementsHook;
    stateHook: AppStateHook;
}
