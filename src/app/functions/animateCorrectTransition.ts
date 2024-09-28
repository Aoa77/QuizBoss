import { Xelement } from "../../core/xobjs/Xelement";
import { fadeOut } from "../constants/fade";

export async function animateCorrectTransition(
    wrong: Xelement<HTMLButtonElement>[],
    question: Xelement<HTMLHeadingElement>,
): Promise<void> {
    await question.runAnimation(fadeOut());
    for (const button of wrong) {
        await button.runAnimation(fadeOut());
    }
}
