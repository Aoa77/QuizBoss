import { Xref } from "../../core/elements/xref";

export function revealButtonScore(
    award: number,
    correctButton: Xref<HTMLButtonElement>
) {
    if (award === 0) {
        return;
    }
    correctButton.innerHTML += " +" + award.toString();
}
