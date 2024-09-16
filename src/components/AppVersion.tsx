import AppContext from "../app/AppContext";

///////////////////////////////////////////
const VERSION = "20240916.175622.148";
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