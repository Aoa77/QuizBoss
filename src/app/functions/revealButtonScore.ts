import { Xelement } from "../../core/xelemental/Xelement";

export function revealButtonScore(
    award: number,
    correctButton: Xelement<HTMLButtonElement>
) {
    if (award === 0) {
        return;
    }
    correctButton.innerHTML += award;
}
