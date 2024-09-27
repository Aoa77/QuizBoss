import { Xelement } from "../../core/xobjs/Xelement";
import { fadeOut } from "../constants/fade";

export async function animateCorrectTransition(
    wrong: Xelement<HTMLButtonElement>[],
    question: Xelement<HTMLHeadingElement>,
): Promise<void> {
    const localSpeed = 1;
    await question.runAnimation(fadeOut(), { localSpeed });
    for (const button of wrong) {
        await button.runAnimation(fadeOut(), {
            localSpeed,
            logger: console.info,
        });
    }
}
