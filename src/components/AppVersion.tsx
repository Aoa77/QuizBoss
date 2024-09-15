import { AppContext } from "../app";
///////////////////////////////////////////
const VERSION = "20240913.190518.551";
///////////////////////////////////////////
export default function AppVersion(context: AppContext) {
    const { elements } = context;
    const { refs } = elements;
    const { appVersion } = refs;
    return (
        <h6 id={appVersion.target} ref={appVersion.object} className="hidden">
            {VERSION}
        </h6>
    );
}
