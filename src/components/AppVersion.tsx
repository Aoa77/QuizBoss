import { AppContext } from "../app";
///////////////////////////////////////////
const VERSION = "20240913.190518.551";
///////////////////////////////////////////
export default function AppVersion(context: AppContext) {
    const { elements } = context;
    return <h6 className="hidden" ref={elements.refs.appVersion}>{VERSION}</h6>;
}