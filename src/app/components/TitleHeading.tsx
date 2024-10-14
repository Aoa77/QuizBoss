import { ELEMENT } from "../constants/ELEMENT";
import { createXref } from "../../core/animation/dom/createXref";

export function TitleHeading(props: { titleText: string }) {
    ///
    const [title] = createXref.headings(ELEMENT.title);
    return (
        <h1
            id={title.id}
            ref={title.ref}
            className="hidden"
            onPointerDown={onPointerDown}>
            {props.titleText}
        </h1>
    );
}

const ENABLE_SECRET_RELOAD = false;

function onPointerDown() {
    if (ENABLE_SECRET_RELOAD) {
        window.location.reload();
        return;
    }
}
