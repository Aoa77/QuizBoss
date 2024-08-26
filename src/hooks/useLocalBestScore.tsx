var isLocalStorageInitialized = false;
export default function useLocalBestScore(best: number, setBest: (value: number) => void) {
        
    if (isLocalStorageInitialized) {
        return;
    }
    isLocalStorageInitialized = true;
    let local:string = localStorage.getItem("bestScore") ?? "";
    local = local.trim();
    if (local.length > 0) {
        setBest(parseInt(local));
    }

}

