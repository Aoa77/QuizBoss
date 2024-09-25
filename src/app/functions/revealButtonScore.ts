import { Xelement } from "../../core/xobjs/Xelement";

export function revealButtonScore(
    award: number,
    correctButton: Xelement<HTMLButtonElement>
) {
    if (award === 0) {
        return;
    }
    correctButton.innerHTML += " +" + award.toString();
}
