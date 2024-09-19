
export default interface EaseOutElastic {
    amplitude: number;
    period: number;
}




// public async fadeIn(
//     target: string,
//     multiplier: Multiplier = Multiplier.x1,
// ) {
//     await this.fade(target, 1, multiplier);
// }

// public async fadeOut(
//     target: string,
//     multiplier: Multiplier = Multiplier.x1,
// ) {
//     await this.fade(target, 0, multiplier);
// }

 async function fade(
    target: string,
    opacity: number,
    multiplier: Multiplier = Multiplier.x1,
) {
    const easing = "linear";
    const targets = this.toTargetSelector(target);
    await animate({ targets, opacity, easing }, Duration.FADE, multiplier);
}

// public async scaleIn(
//     target: string,
//     multiplier: Multiplier = Multiplier.x1,
// ) {
//     await this.scale(target, 1.19, multiplier);
// }

// public async scaleOut(
//     target: string,
//     multiplier: Multiplier = Multiplier.x1,
// ) {
//     await this.scale(target, 1.00, multiplier);
// }

// public async scale(
//     target: string,
//     scale: number,
//     multiplier: Multiplier = Multiplier.x1,
// ) {
//     const easing = "linear";
//     const targets = this.toTargetSelector(target);
//     await animate({ targets, easing, scale }, Duration.SCALE, multiplier);
// }


// export class EasingFunctions {
//     public static easeOutElastic(params: EaseOutElasticParams): string {
//         return `easeOutElastic(${params.amplitude}, ${params.period})`;
//     }
//     public static easeInElastic(params: EaseOutElasticParams): string {
//         return `easeInElastic(${params.amplitude}, ${params.period})`;
//     }
// }