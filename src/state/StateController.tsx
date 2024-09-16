import State from "./State";

export default interface StateController {
    state: State;
    setState: React.Dispatch<React.SetStateAction<State>>;
}
