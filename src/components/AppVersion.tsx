import { AppContext } from "../app";
const VERSION: string = "[version]";

export default function AppVersion(context: AppContext) {
    const { elements: elementController } = context;
    return <h6 ref={elementController.refs.appVersion}>{VERSION}</h6>;
}
