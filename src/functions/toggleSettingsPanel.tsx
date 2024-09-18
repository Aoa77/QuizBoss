import anime from "animejs";
import AppContext from "../app/AppContext";

const activeClass: string = "active";
let canClick: boolean = true;
let isActive: boolean = false;
let sliderTop: number | null = null;

export default async function toggleSettingsPanel() {
    if (!canClick) {
        return;
    }
    canClick = false;

    const elements = AppContext.elements();
    const { refs } = elements;
    const { settingsPanel, sliderGrip, sliderNotch } = refs;

    const targets = elements.toTargetSelector(settingsPanel.target);
    sliderTop ??= sliderGrip.object.current!.getBoundingClientRect().top;
    console.debug("sliderTop", sliderTop);

    const grip = sliderGrip.object.current!;
    const notch = sliderNotch.object.current!;

    await elements.fadeOut(sliderNotch.target);
    grip.classList.toggle(activeClass);
    anime({
        targets,
        top: isActive ? sliderTop : 0,
        easing: "spring(1, 80, 20, 0)",
        complete: async () => {
            isActive = !isActive;
            notch.classList.toggle(activeClass);
            await elements.fadeIn(sliderNotch.target);
            canClick = true;
        },
    });
}
