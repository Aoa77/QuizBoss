import toggleSettingsPanel from "../functions/toggleSettingsPanel";
import { ElementNames } from "../elements/constants";
import { useXrefDivs } from "../../core/xrefs/divs";

export default function SettingsPanel() {
    const [settingsPanel, sliderGrip, sliderNotch] = useXrefDivs(
        ElementNames.settingsPanel,
        ElementNames.sliderGrip,
        ElementNames.sliderNotch,
    );

    return (
        <section
            id={settingsPanel!.id}
            ref={settingsPanel!.ref}
            className="settings-panel">
            <div
                id={sliderGrip!.id}
                ref={sliderGrip!.ref}
                className="slider-grip"
                onPointerDown={() => toggleSettingsPanel()}>
                <div
                    id={sliderNotch!.id}
                    ref={sliderNotch!.ref}
                    className="slider-notch"></div>
            </div>
        </section>
    );
}
