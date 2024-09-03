import { Config } from "../models";
import AppContext from "./AppContext";
import AppStateHook from "./AppStateHook";
import ElementsHook from "./ElementsHook";

export default function useAppContext(
    config: Config,
    elementsHook: ElementsHook,
    stateHook: AppStateHook,
): AppContext {

    return {
        config,
        elementsHook,
        stateHook
    };
}
