import AppContext from "../app/AppContext";

///////////////////////////////////////////
const VERSION = "20240916.181453.076";
///////////////////////////////////////////
export default function AppVersion() {
    const elements = AppContext.elements();
    const { refs } = elements;
    const { appVersion } = refs;
    return (
        <h6 id={appVersion.target} ref={appVersion.object} className="hidden">
            {VERSION}
        </h6>
    );
}