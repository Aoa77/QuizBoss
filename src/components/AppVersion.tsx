import { AppContext } from "../app";
///////////////////////////////////////////
const VERSION = "20240913.183901.204";
///////////////////////////////////////////
export default function AppVersion(context: AppContext) {
    const { elements: elementController } = context;
    return <h6 ref={elementController.refs.appVersion}>{VERSION}</h6>;
}