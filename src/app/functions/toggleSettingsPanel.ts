import anime from "animejs";
import AppContext from "../AppContext";

const activeClass: string = "active";
let canClick: boolean = true;
let isActive: boolean = false;
let sliderTop: number = -1;

export default async function toggleSettingsPanel() {
    if (!canClick) {
        return;
    }
    canClick = false;

    const elements = AppContext.elements();
    const { refs } = elements;
    const { settingsPanel, sliderGrip, sliderNotch } = refs;

    if (sliderTop === -1) {
        const slider = sliderGrip.element!;
        sliderTop = slider.getBoundingClientRect().top;
        console.debug("sliderTop", sliderTop);
    }

    const grip = sliderGrip.element!;
    const notch = sliderNotch.element!;

    await elements.fadeOut(sliderNotch);
    grip.classList.toggle(activeClass);
    anime({
        targets: settingsPanel.idSelector,
        top: isActive ? sliderTop : 0,
        easing: "spring(1, 80, 20, 0)",
        complete: async () => {
            isActive = !isActive;
            notch.classList.toggle(activeClass);
            await elements.fadeIn(sliderNotch);
            canClick = true;
        },
    });
}
