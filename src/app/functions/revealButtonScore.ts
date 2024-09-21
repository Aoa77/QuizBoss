export default function revealButtonScore(
    award: number,
    correctButtonRef: HTMLButtonElement
) {
    if (award === 0) {
        return;
    }
    correctButtonRef!.innerHTML += " +" + award.toString();
}
