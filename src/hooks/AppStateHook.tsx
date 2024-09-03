import { AppState } from "../models";


export default interface AppStateHook {
    state: AppState;
    setState: React.Dispatch<React.SetStateAction<AppState>>;
}
