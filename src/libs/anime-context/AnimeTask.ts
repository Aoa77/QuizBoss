import { AnimeInstance } from "animejs";

export class AnimeTask {
    public static run(instance: AnimeInstance): Promise<void> {
        return new Promise((resolve, reject) => {
            instance.finished
                .then(() => {
                    resolve();
                })
                .catch((error) => {
                    reject(error);
                });
            instance.play();
        });
    }
}
