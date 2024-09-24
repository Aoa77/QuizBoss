import anime from "animejs";
import { ELEMENT } from "../elements/constants";
import { getXrefDivs } from "../../core/elements/divs";

const activeClass: string = "active";
let canClick: boolean = true;
let isActive: boolean = false;
let sliderTop: number = -1;

export async function toggleSettingsPanel() {
    if (!canClick) {
        return;
    }
    canClick = false;
    
    const [settingsPanel, sliderGrip, sliderNotch] = getXrefDivs(
        ELEMENT.settingsPanel,
        ELEMENT.sliderGrip,
        ELEMENT.sliderNotch,
    );

    if (sliderTop === -1) {
        const slider = sliderGrip.element!;
        sliderTop = slider.getBoundingClientRect().top;
        console.debug("sliderTop", sliderTop);
    }

    const grip = sliderGrip.element;
    const notch = sliderNotch.element;

    sliderNotch.fadeOut();
    grip.classList.toggle(activeClass);
    anime({
        targets: settingsPanel.idSelector,
        top: isActive ? sliderTop : 0,
        easing: "spring(1, 80, 20, 0)",
        complete: async () => {
            isActive = !isActive;
            notch.classList.toggle(activeClass);
            sliderNotch.fadeIn();
            canClick = true;
        },
    });
}
