import { AppContext } from "../hooks";

export default function GuessButtons(context: AppContext) {
    const { elementContext } = context;
    return (
        <section ref={elementContext.refs.buttonsSection} className="buttons hidden">
            {elementContext.guessButtons.map((b) => b.element)}
        </section>
    );
}
