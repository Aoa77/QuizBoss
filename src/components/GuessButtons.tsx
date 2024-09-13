import { AppContext } from "../app";

export default function GuessButtons(context: AppContext) {
    const { elements } = context;
    return (
        <section ref={elements.refs.buttonsSection} className="buttons hidden">
            {elements.guessButtons.map((b) => b.element)}
        </section>
    );
}
