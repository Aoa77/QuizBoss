import { useXref } from "../../core/hooks/useXref";
import toggleSettingsPanel from "../functions/toggleSettingsPanel";
import { ElementNames } from "../elements/ElementNames";

export default function SettingsPanel() {
    const [settingsPanel, sliderGrip, sliderNotch] = useXref<HTMLDivElement>(
        { id: ElementNames.settingsPanel },
        { id: ElementNames.sliderGrip },
        { id: ElementNames.sliderNotch },
    );

    return (
        <section
            id={settingsPanel.id}
            ref={settingsPanel.ref}
            className="settings-panel">
            <div
                id={sliderGrip.id}
                ref={sliderGrip.ref}
                className="slider-grip"
                onPointerDown={() => toggleSettingsPanel()}>
                <div
                    id={sliderNotch.id}
                    ref={sliderNotch.ref}
                    className="slider-notch"></div>
            </div>
        </section>
    );
}
