import { AppSettings } from ".";
import { useQueryParams } from "../hooks";

export default function AppConfig(quizModuleName: string) {
    const queryParams = useQueryParams(window.location.search);
    return new AppSettings({ quizModuleName }, queryParams);
}
