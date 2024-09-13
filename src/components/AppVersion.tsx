import { AppContext } from "../app";
const VERSION: string = "[replace whatever is in here]";

export default function AppVersion(context: AppContext) {
    const { elements: elementController } = context;
    return <h6 ref={elementController.refs.appVersion}>{VERSION}</h6>;
}