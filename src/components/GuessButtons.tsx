import AppContext from "../app/AppContext";

export default function GuessButtons() {
    const elements = AppContext.elements();
    const { refs } = elements;
    const { buttonArea } = refs;
    return (
        <section
            id={buttonArea.target}
            ref={buttonArea.object}
            className="buttons hidden">
            {elements.guessButtons.map((b) => b.element)}
        </section>
    );
}
