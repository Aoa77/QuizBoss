import { Dispatch, SetStateAction } from "react";
import { StateFlowController } from "./StateFlowController";


export function getStateFlow<Tstate>(): [
    Tstate,
    Dispatch<SetStateAction<Tstate>>
] {
    return StateFlowController.getHooked<Tstate>();
}
