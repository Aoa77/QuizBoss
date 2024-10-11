

export class AsyncGroup {
    private promises: Promise<unknown>[] = [];

    public add(promise: Promise<unknown>) {
        this.promises.push(promise);
    }

    public async all() {
        await Promise.all(this.promises);
    }
}
