import { Dispatch, SetStateAction } from "react";
import { Controller } from "./Controller";

export function flow<Tstate>(): [
    Tstate,
    Dispatch<SetStateAction<Tstate>>,
] {
    return Controller.getHooked<Tstate>();
}
