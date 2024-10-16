import "./TitleHeading.css";
import { ELEMENT } from "../constants/ELEMENT";
import { createXref } from "../../core/animation/dom/createXref";

export function TitleHeading(props: { titleText: string }) {
    ///
    const [title] = createXref.divs(ELEMENT.title);
    return (
        <section id={title.id} ref={title.ref} onPointerDown={onPointerDown}>
            {props.titleText}
        </section>
    );
}

const ENABLE_SECRET_RELOAD = true;

function onPointerDown() {
    if (ENABLE_SECRET_RELOAD) {
        window.location.reload();
        return;
    }
}
