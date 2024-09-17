import useQueryParams from "../hooks/useQueryParams";
import AppSettings from "./AppSettings";

export default function AppConfig(quizModuleName: string) {
    const queryParams = useQueryParams(window.location.search);
    const settings = new AppSettings({ quizModuleName }, queryParams);
    AppSettings.setInstance(settings);
    return settings;
}
