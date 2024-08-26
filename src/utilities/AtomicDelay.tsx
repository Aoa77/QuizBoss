export default class AtomicDelay {
    private readonly atom: number;
    constructor(atom: number) {
        this.atom = atom;
    }

    private delay(x: number): Promise<void> {
        return new Promise((resolve) => setTimeout(resolve, this.atom * x));
    }
    
    public loadThrottle() {
        return this.delay(1);
    }
    
    public spinnerPoll() {
        return this.delay(2);
    }

    public questionHeading() {
        return this.delay(3);
    }

    public loadingSection() {
        return this.delay(4);
    }
}