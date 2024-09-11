import { AppContext, ElementContext, StateContext } from "../context";
import { Config } from "../models";

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
