import "./LoadingSpinner.css";
import { createXref } from "../../core/animation/dom/createXref";
import { ELEMENT } from "../constants/ELEMENT";
import { RADIUS } from "./LoadingSpinner.constants.ts";

export function LoadingSpinner() {
    const [loading] = createXref.divs(ELEMENT.loadingSpinner);
    const balls = 3;
    const spacing = 50;
    const radius = RADIUS.RADIUS_SMALL;
    const radiusMultiplier = 6;
    const radiusHalf = radius * (radiusMultiplier / 2);
    const width = balls * spacing + radius;
    const viewBox = `0 0 ${width} ${radius * radiusMultiplier}`;

    const svgBalls = [];
    for (let i = 0; i < balls; i++) {
        svgBalls.push(
            <circle
                key={i}
                cx={radiusHalf + i * spacing}
                cy={radiusHalf}
                r={radius}
            />,
        );
    }
    return (
        <section id={loading.id} ref={loading.ref}>
            <svg viewBox={viewBox} xmlns="http://www.w3.org/2000/svg">
                {svgBalls}
            </svg>
        </section>
    );
}
