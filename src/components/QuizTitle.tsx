import "./QuizTitle.css";

const config = {
    ANIMATION_ID: "QuizTitle",
    ENABLE_SECRET_RELOAD: true,
}

export function QuizTitle(props: { text: string }) {
    return (
        <section id={config.ANIMATION_ID} onPointerDown={onPointerDown}>
            {props.text}
        </section>
    );
}

function onPointerDown() {
    if (config.ENABLE_SECRET_RELOAD) {
        window.location.reload();
        return;
    }
}

// export class $QuizTitle {
//     public static fadeIn() : Promise<void> {


//     }    
// }
