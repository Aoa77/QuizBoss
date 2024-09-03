import { AppState } from "../props";

var isLocalStorageInitialized = false;
export default function useLocalBestScore(
    state: AppState,
    setState: React.Dispatch<React.SetStateAction<AppState>>,
) {
    if (isLocalStorageInitialized) {
        return;
    }
    isLocalStorageInitialized = true;
    let local: string = localStorage.getItem("bestScore") ?? "";
    local = local.trim();
    if (local.length > 0) {
        setState({ ...state, best: parseInt(local) });
    }
}
