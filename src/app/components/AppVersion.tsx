import { createElementHeadings } from "../../core/xelemental/createElementHeadings";
import { ELEMENT } from "../animation/elements";

///////////////////////////////////////////
const VERSION = "20240918.151216.384";
///////////////////////////////////////////
export function AppVersion() {
    const [appVersion] = createElementHeadings(ELEMENT.appVersion);
    return (
        <h6 id={appVersion.id} ref={appVersion.ref} className="hidden">
            {VERSION}
        </h6>
    );
}
