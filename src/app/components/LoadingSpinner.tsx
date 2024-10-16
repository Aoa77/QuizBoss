import "./LoadingSpinner.css";
import { createXref } from "../../core/animation/dom/createXref";
import { ELEMENT } from "../constants/ELEMENT";
import { LOADING_SPINNER } from "../constants/LOADING_SPINNER.ts";

export function LoadingSpinner() {
    const [loading] = createXref.divs(ELEMENT.loadingSpinner);
    const balls = 3;
    const spacing = 50;
    const radius = LOADING_SPINNER.RADIUS_SMALL;
    const width = balls * spacing + radius;

    const svgBalls = [];
    for (let i = 0; i < balls; i++) {
        svgBalls.push(
            <circle
                key={i}
                cx={radius * 3 + i * spacing}
                cy={radius * 3}
                r={radius}
            />,
        );
    }
    return (
        <section id={loading.id} ref={loading.ref}>
            <svg width={width} xmlns="http://www.w3.org/2000/svg">
                {svgBalls}
            </svg>
        </section>
    );
}
