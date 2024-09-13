import { AppContext } from "../app";

export default function GuessButtons(context: AppContext) {
    const { elements: elementController } = context;
    return (
        <section ref={elementController.refs.buttonsSection} className="buttons hidden">
            {elementController.guessButtons.map((b) => b.element)}
        </section>
    );
}
