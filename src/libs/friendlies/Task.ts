export class Task {
    public static async all(
        ...tasks: (() => Promise<unknown>)[]
    ): Promise<void> {
        await TaskGroup.create(...tasks).all();
    }

    public static async any(
        ...tasks: (() => Promise<unknown>)[]
    ): Promise<void> {
        await TaskGroup.create(...tasks).any();
    }

    public static createGroup(): TaskGroup {
        return new TaskGroup();
    }

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
    public static create(...tasks: (() => Promise<unknown>)[]): TaskGroup {
        const group = new TaskGroup();
        group.add(...tasks);
        return group;
    }

    private readonly _tasks: (() => Promise<unknown>)[] = [];

    public add(...tasks: (() => Promise<unknown>)[]): TaskGroup {
        for (const task of tasks) {
            this._tasks.push(task);
        }
        return this;
    }

    public async all(): Promise<void> {
        const promises = [];
        while (this._tasks.length > 0) {
            promises.push(this._tasks.shift()!());
        }
        await Promise.all(promises);
    }

    public async any(): Promise<void> {
        const promises = [];
        while (this._tasks.length > 0) {
            promises.push(this._tasks.shift()!());
        }
        await Promise.race(promises);
    }
}
