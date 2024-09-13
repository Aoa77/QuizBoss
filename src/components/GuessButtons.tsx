import { ContextController } from "../controllers";

export default function GuessButtons(context: ContextController) {
    const { elements: elementController } = context;
    return (
        <section ref={elementController.refs.buttonsSection} className="buttons hidden">
            {elementController.guessButtons.map((b) => b.element)}
        </section>
    );
}
