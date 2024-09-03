import { AppContext } from "../hooks";

export default function GuessButtons(context: AppContext) {
    const { elementsHook } = context;
    return (
        <section ref={elementsHook.refs.buttonsSection} className="buttons hidden">
            {elementsHook.guessButtons.map((b) => b.element)}
        </section>
    );
}
