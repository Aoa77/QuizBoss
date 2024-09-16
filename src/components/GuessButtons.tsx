import AppContext from "../app/AppContext";

export default function GuessButtons(context: AppContext) {
    const { elements } = context;
    const { refs } = elements;
    const { buttonArea } = refs;
    return (
        <section
            id={buttonArea.target}
            ref={buttonArea.object}
            className="buttons hidden"
        >
            {elements.guessButtons.map((b) => b.element)}
        </section>
    );
}
