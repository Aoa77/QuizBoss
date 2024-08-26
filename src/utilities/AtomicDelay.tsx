export default class AtomicDelay {
    private readonly atom: number;
    constructor(atom: number) {
        this.atom = atom;
    }

    private delay(x: number): Promise<void> {
        return new Promise((resolve) => setTimeout(resolve, this.atom * x));
    }

    public image() {
        return this.delay(38);
    }

    public heading() {
        return this.delay(23);
    }

    public briefPause() {
        return this.delay(33);
    }

    public button() {
        return this.delay(7);
    }
    
    public loadingExtended() {
        return this.delay(42);
    }
    
    public loadThrottle() {
        return this.delay(1);
    }
    
    public spinnerPoll() {
        return this.delay(2);
    }
}