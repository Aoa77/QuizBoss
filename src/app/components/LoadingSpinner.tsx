import "./LoadingSpinner.css";
import { createXref } from "../../core/animation/dom/createXref";
import { ELEMENT } from "../constants/ELEMENT";
import { RadArray } from "./LoadingSpinner.constants";

export function LoadingSpinner() {
    const [loading] = createXref.divs(ELEMENT.loadingSpinner);
    // const balls = 3;
    // const spacing = 5;
    // const start_radius = RadArray[1];
    // const radius = RadArray[0];
    // const radiusMultiplier = 6;
    // const radiusHalf = radius * (radiusMultiplier / 2);
    // const width = balls * spacing + radius;
    const viewBox = `0 0 140 140`;

    // const svgBalls = [];
    // for (let i = 0; i < balls; i++) {
    //     svgBalls.push(<circle key={i} cx={0} cy={0} r={start_radius} />);
    // }
    return (
        <section id={loading.id} ref={loading.ref}>
            <svg viewBox={viewBox} xmlns="http://www.w3.org/2000/svg">
                <circle cx="45" cy="50" r={RadArray[1]} />
                <circle cx="70" cy="50" r={RadArray[1]} />
                <circle cx="95" cy="50" r={RadArray[1]} />
            </svg>
        </section>
    );
}
