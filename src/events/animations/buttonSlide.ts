import { Anim } from "../../code/animation";
import { AnimeRef, $time, $ease } from "../../libs/anime-context";
import { Task } from "../../libs/friendlies/Task";

export async function buttonSlide(buttonRef: AnimeRef) {
    const translateY = Anim.QuestionText.rect!.top - buttonRef.rect!.top;
    const slide = Task.createGroup();
    slide.add(() => Anim.QuestionTimer.run({
        opacity: 0,
        delay: $time.ticks(0),
        duration: $time.ticks(0.75),
        easing: $ease.linear,
    })
    );
    slide.add(() => buttonRef.run({
        translateY,
        delay: $time.ticks(0.25),
        duration: $time.ticks(1),
        endDelay: 0,
        easing: $ease.out.elastic(2.75, 1),
    })
    );
    await slide.all();
}
