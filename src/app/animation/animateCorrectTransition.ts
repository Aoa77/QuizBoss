import { fadeOut } from "../../core/anime-x/fade";
import { Xelement } from "../../core/xelemental/Xelement";

export async function animateCorrectTransition(
    wrong: Xelement<HTMLButtonElement>[],
    question: Xelement<HTMLHeadingElement>,
): Promise<void> {
    await question.runAnimation(fadeOut());
    for (const button of wrong) {
        await button.runAnimation(fadeOut());
    }
}
