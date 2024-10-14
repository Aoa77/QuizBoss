import { createXref } from "../../core/animation/dom/createXref";
import { ELEMENT } from "../constants/ELEMENT";

///////////////////////////////////////////
const VERSION = "20240918.151216.384";
///////////////////////////////////////////
export function AppVersion() {
    const [appVersion] = createXref.headings(ELEMENT.appVersion);
    return (
        <h6 id={appVersion.id} ref={appVersion.ref} className="hidden">
            {VERSION}
        </h6>
    );
}

