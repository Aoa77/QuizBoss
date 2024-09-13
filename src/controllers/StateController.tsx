import { State } from "../app";


export default interface StateController {
    state: State;
    setState: React.Dispatch<React.SetStateAction<State>>;
}

