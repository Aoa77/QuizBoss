export default function fireAndForget(action: () => Promise<void>): void {
    action();
}
