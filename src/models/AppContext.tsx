import { AppStateHook, ElementsHook } from "../hooks";
import { Config } from "../models";

export default interface AppContext {
    config: Config;
    elementsHook: ElementsHook;
    stateHook: AppStateHook;
}
