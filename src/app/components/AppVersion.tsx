import { useXrefHeadings } from "../../core/elements/headings";
import { ELEMENT } from "../elements/ELEMENT";

///////////////////////////////////////////
const VERSION = "20240918.151216.384";
///////////////////////////////////////////
export function AppVersion() {
    const [appVersion] = useXrefHeadings(ELEMENT.appVersion);
    return (
        <h6 id={appVersion.id} ref={appVersion.ref} className="hidden">
            {VERSION}
        </h6>
    );
}
