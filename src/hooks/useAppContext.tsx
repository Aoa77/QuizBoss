import { Config } from "../models";
import AppContext from "./AppContext";
import StateContext from "./StateContext";
import ElementContext from "./ElementContext";

export default function useAppContext(
    config: Config,
    elementContext: ElementContext,
    stateContext: StateContext,
): AppContext {

    return {
        config,
        elementContext: elementContext,
        stateContext
    };
}
