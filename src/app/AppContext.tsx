import AppSettings from "./AppSettings";
import ElementController from "../elements/ElementController";
import StateController from "../state/StateController";

export default class AppContext {
    ////
    private static _appState?: StateController;
    private static _elements?: ElementController;
    private static _settings?: AppSettings;

    public static initAppState(instance: StateController): void {
        if (this._appState) {
          //  return;
        }
        this._appState = instance;
    }

    public static initElements(instance: ElementController): void {
        if (this._elements) {
            return;
        }
        this._elements = instance;
    }

    public static initSettings(instance: AppSettings): void {
        if (this._settings) {
            return;
        }
        this._settings = instance;
    }

    public static appState(): StateController {
        if (!this._appState) {
            throw new Error("StateController instance not initialized.");
        }
        return this._appState;
    }

    public static elements(): ElementController {
        if (!this._elements) {
            throw new Error("ElementController instance not initialized.");
        }
        return this._elements;
    }

    public static settings(): AppSettings {
        if (!this._settings) {
            throw new Error("AppSettings instance not initialized.");
        }
        return this._settings;
    }
}
