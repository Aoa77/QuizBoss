import { Config } from "../models";
import StateContext from "./StateContext";
import ElementContext from "./ElementContext";

export default interface AppContext {
    config: Config;
    elementContext: ElementContext;
    stateContext: StateContext;
}
