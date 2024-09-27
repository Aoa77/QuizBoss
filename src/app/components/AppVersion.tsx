import { useElementHeadings } from "../../core/hooks/useElementHeadings";
import { ELEMENT } from "./_ELEMENTS";

///////////////////////////////////////////
const VERSION = "20240918.151216.384";
///////////////////////////////////////////
export function AppVersion() {
    const [appVersion] = useElementHeadings(ELEMENT.appVersion);
    return (
        <h6 id={appVersion.id} ref={appVersion.ref} className="hidden">
            {VERSION}
        </h6>
    );
}
