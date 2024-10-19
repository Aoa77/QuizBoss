export class Task {
    public static delay(ms: number): Promise<void> {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    public static group(): TaskGroup {
        return new TaskGroup();
    }

    public static until(
        predicate: () => boolean,
        pollingInterval: number = 100,
    ): Promise<void> {
        return new Promise((resolve) => {
            const interval = setInterval(() => {
                if (predicate()) {
                    clearInterval(interval);
                    resolve();
                }
            }, pollingInterval);
        });
    }
}

export class TaskGroup {
    private _tasks: Promise<unknown>[] = [];

    public add(task: Promise<unknown>) {
        this._tasks.push(task);
    }

    public async all() {
        await Promise.all(this._tasks);
    }

    public async any() {
        await Promise.race(this._tasks);
    }
}
