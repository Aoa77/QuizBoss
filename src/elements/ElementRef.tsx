export default class ElementRef<T> {
    public readonly object: React.MutableRefObject<T | null>;
    public readonly target: string;
    public readonly targetSelector: string;

    constructor(target: string, object: React.MutableRefObject<T | null>) {
        this.object = object;
        this.target = target;
        this.targetSelector = `#${target}`;
    }
}
