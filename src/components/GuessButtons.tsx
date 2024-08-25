import { Context } from "../context/Context";

export default function GuessButtons(context: Context) {
    const { elements, guessButtons } = context;
    return (
        <section ref={elements.buttons} className="buttons hidden">
            {guessButtons.map((b) => b.element)}
        </section>
    );
}
