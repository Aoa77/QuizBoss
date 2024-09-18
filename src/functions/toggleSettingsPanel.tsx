import anime from "animejs";
import AppContext from "../app/AppContext";

const active: string = "active";
let sliderTop: number | null = null;

export default function toggleSettingsPanel() {
    const elements = AppContext.elements();
    const { refs } = elements;
    const { settingsPanel, sliderGrip, sliderNotch } = refs;

    const targets = elements.toTargetSelector(settingsPanel.target);
    sliderTop ??= sliderGrip.object.current!.getBoundingClientRect().top;
    console.info("sliderTop", sliderTop);

    const notch = sliderNotch.object.current!;
    const isActive = notch.classList.contains(active);
    sliderGrip.object.current!.style.backgroundColor = isActive
        ? "#000088"
        : "#000033";

    anime({
        targets,
        top: isActive ? sliderTop : 0,
        easing: "spring(1, 80, 20, 0)",
        begin: () => {
            elements.fadeOut(sliderNotch.target);
        },
        complete: () => {
            notch.classList.toggle(active);
            elements.fadeIn(sliderNotch.target);
        },
    });
}
