import AppContext from "../app/AppContext";
import toggleSettingsPanel from "../functions/toggleSettingsPanel";

export default function SettingsPanel() {
    const elements = AppContext.elements();
    const { refs } = elements;
    const { settingsPanel, sliderGrip, sliderNotch } = refs;
    return (
        <section
            id={settingsPanel.target}
            ref={settingsPanel.object}
            className="settings-panel">
            <div
                id={sliderGrip.target}
                ref={sliderGrip.object}
                className="slider-grip"
                onPointerDown={() => toggleSettingsPanel()}>
                <div
                    id={sliderNotch.target}
                    ref={sliderNotch.object}
                    className="slider-notch"></div>
            </div>
        </section>
    );
}
