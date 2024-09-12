import { State } from "../models";


export default interface StateContext {
    state: State;
    setState: React.Dispatch<React.SetStateAction<State>>;
}

