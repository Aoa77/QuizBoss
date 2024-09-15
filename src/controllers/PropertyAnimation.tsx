import Duration from "./Duration";

export default interface PropertyAnimation {
    target: string;
    duration?: Duration;
    value: number;
}
