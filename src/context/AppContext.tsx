import { Config } from "../models";
import StateContext from "./StateContext";
import ElementContext from "./ElementContext";
import TimeContext from "./TimeContext";

export default interface AppContext {
    config: Config;
    elementContext: ElementContext;
    stateContext: StateContext;
    timeContext: TimeContext;
}
