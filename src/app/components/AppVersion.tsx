import { useXref } from "../../core/hooks/useXref";
import { ElementNames } from "../elements/ElementNames";

///////////////////////////////////////////
const VERSION = "20240918.151216.384";
///////////////////////////////////////////
export default function AppVersion() {
    const [appVersion] = useXref<HTMLHeadingElement>({
        id: ElementNames.appVersion,
    });
    return (
        <h6 id={appVersion.id} ref={appVersion.ref} className="hidden">
            {VERSION}
        </h6>
    );
}
