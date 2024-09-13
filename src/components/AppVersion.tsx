import { AppContext } from "../app";
const VERSION = "2024-09-13T17:41:17.528Z";

export default function AppVersion(context: AppContext) {
    const { elements: elementController } = context;
    return <h6 ref={elementController.refs.appVersion}>{VERSION}</h6>;
}