import { Config } from "../models";
import {
    AppContext,
    ElementContext,
    StateContext,
    TimeContext,
} from "../context";

export default function useAppContext(
    config: Config,
    elementContext: ElementContext,
    stateContext: StateContext,
    timeContext: TimeContext,
): AppContext {
    return {
        config,
        elementContext,
        stateContext,
        timeContext,
    };
}
