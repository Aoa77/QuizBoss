// import ElementXref from "../models/ElementXref";
// import ElementXrefs from "./AppRefs";
// import fade from "../animation/fade";
// import scale from "../animation/scale";
// import delay from "../time/delay";
// import { Duration } from "../time/Duration";
// import { Multiplier } from "../time/Multiplier";
// import { ButtonState } from "../models/ButtonState";

// export default class ElementController {
//     // public members
//     public readonly refs: ElementXrefs;

//     constructor(refs: ElementXrefs) {
//         this.refs = refs;
//     }

//     // public methods
//     public async blinkButton(button: HTMLButtonElement) {
//         for (let blink = 0; blink < Duration.BLINKS; blink++) {
//             button.className =
//                 blink % 2 ? ButtonState.REVEAL : ButtonState.BLINK;
//             await delay(Duration.BLINK);
//         }
//     }

//     public clearScoreBonusStyle() {
//         this.refs.scoreValue.ref.current!.className = "";
//     }

//     public async applyScoreAward(
//         score: number,
//         award: number,
//     ): Promise<number> {
//         //
//         this.refs.scoreValue.object.current!.className = "bonus";
//         const target = score + award;

//         for (let bonus = score + 1; bonus <= target; bonus++) {
//             this.refs.scoreValue.object.current!.innerHTML = bonus.toString();
//             await delay(Duration.WAIT);
//         }

//         return target;
//     }



//     public async fadeIn<T>(
//         xref: ElementXref<T>,
//         multiplier: Multiplier = Multiplier.x1,
//     ) {
//         await fade(xref.targetSelector, 1, multiplier);
//     }

//     public async fadeOut<T>(
//         xref: ElementXref<T>,
//         multiplier: Multiplier = Multiplier.x1,
//     ) {
//         await fade(xref.targetSelector, 0, multiplier);
//     }

//     public async scaleIn<T>(
//         xref: ElementXref<T>,
//         multiplier: Multiplier = Multiplier.x1,
//     ) {
//         await scale(xref, 1.3, multiplier);
//     }

//     public async scaleOut<T>(
//         xref: ElementXref<T>,
//         multiplier: Multiplier = Multiplier.x1,
//     ) {
//         await scale(xref, 1.0, multiplier);
//     }

// }