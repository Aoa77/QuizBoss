import AppContext from "../AppContext";

export default function getCorrectAnswerButton() {
    const elements = AppContext.elements();
    const { refs } = elements;
    const { buttons } = refs;

    const appState = AppContext.appState();
    const { state } = appState;
    const { answerSpot } = state;
    return buttons[answerSpot];
}
