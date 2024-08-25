import AllProps from "../props/AllProps";

export default function GuessButtons(props: AllProps) {
    const { elements, guessButtons } = props;
    return (
        <section ref={elements.buttons} className="buttons hidden">
            {guessButtons.map((b) => b.element)}
        </section>
    );
}
