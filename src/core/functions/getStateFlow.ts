import { Dispatch, SetStateAction } from "react";
import { StateFlow } from "../xobjs/StateFlow";

export function getStateFlow<Tstate>(): [
    Tstate,
    Dispatch<SetStateAction<Tstate>>,
] {
    return StateFlow.getHooked<Tstate>();
}
