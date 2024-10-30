export class Task {
    public static delay(ms: number): Promise<void> {
        return new Promise((resolve) => setTimeout(resolve, ms));
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

    public static throwError(error: unknown) {
        throw error;
    }
}

export class TaskGroup {
    ////
    public static create(): TaskGroup {
        return new TaskGroup();
    }

    private readonly _tasks: Promise<unknown>[] = [];

    public add(task: Promise<unknown>) {
        this._tasks.push(task);
    }

    public async all() {
        await Promise.all(this._tasks);
    }

    public async any() {
        await Promise.race(this._tasks);
    }

    public async first() {
        await this._tasks[0];
    }
}
