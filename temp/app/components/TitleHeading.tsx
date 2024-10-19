import "./TitleHeading.css";
import { $TitleHeading } from "./TitleHeading.xref";

export function TitleHeading(props: { titleText: string }) {
    ///
    const xref = $TitleHeading.initXref("TitleHeading");
    return (
        <section id={xref.id} onPointerDown={onPointerDown}>
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
