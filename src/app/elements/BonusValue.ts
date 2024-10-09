import { Xelement } from "../../core/animation/dom/Xelement";
import { xref } from "../../core/animation/dom/xref";
import { ELEMENT } from "../constants/ELEMENT";
import { TIME } from "../constants/TIME";

export class BonusValue {
    public static xref(): Xelement<HTMLHeadingElement> {
        return xref.headings(ELEMENT.bonusValue)[0];
    }
    
    public static async reset() {
        await BonusValue.xref().scaleImmediately(0.0);
        BonusValue.xref().opacity = 1.0;
    }

    public static async scaleUp() {
        await BonusValue.xref().scaleTo({
            duration: TIME.BONUS_SCALE,
            scale: 1.0,
        });
    }

    public static async scaleDown() {
        await BonusValue.xref().scaleTo({
            duration: TIME.BONUS_SCALE,
            scale: 0.0,
        });
    }
}
