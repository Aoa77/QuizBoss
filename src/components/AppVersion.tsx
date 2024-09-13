import { ContextController } from "../controllers";
const VERSION: string = "[version]";

export default function AppVersion(context: ContextController) {
    const { elements: elementController } = context;
    return <h6 ref={elementController.refs.appVersion}>{VERSION}</h6>;
}
