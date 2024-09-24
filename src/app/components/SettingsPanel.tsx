import { toggleSettingsPanel } from "../functions/toggleSettingsPanel";
import { ELEMENT } from "../elements/constants";
import { useXrefDivs } from "../../core/elements/divs";

export function SettingsPanel() {
    const [settingsPanel, sliderGrip, sliderNotch] = useXrefDivs(
        ELEMENT.settingsPanel,
        ELEMENT.sliderGrip,
        ELEMENT.sliderNotch,
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
