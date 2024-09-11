import { AppState } from "../models";


export default interface StateContext {
    state: AppState;
    setState: React.Dispatch<React.SetStateAction<AppState>>;
}

