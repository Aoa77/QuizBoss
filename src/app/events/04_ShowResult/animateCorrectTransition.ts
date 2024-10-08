import { fadeOut } from "../../../core/animation/fade";
import { Xelement } from "../../../core/animation/dom/Xelement";

export async function animateCorrectTransition(
    wrong: Xelement<HTMLButtonElement>[],
    question: Xelement<HTMLHeadingElement>,
): Promise<void> {
    await question.runAnimation(fadeOut());
    for (const button of wrong) {
        await button.runAnimation(fadeOut());
    }
}
