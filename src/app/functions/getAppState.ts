import { Dispatch, SetStateAction } from "react";
import { getStateFlow } from "../../core/functions/getStateFlow";
import { AppState } from "../models/AppState";

export function getAppState(): [AppState, Dispatch<SetStateAction<AppState>>] {
    return getStateFlow<AppState>();
}
