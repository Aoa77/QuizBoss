import { AnimeParams, AnimeInstance } from "animejs";


export interface AnimeRef {
    id: string;
    target: string;
    targetWith(companions: AnimeRef[]) : AnimeRef;
    get color() : string | null;
    set color(value: string);
    get rect(): DOMRect | null;
    get opacity(): number | null;
    set opacity(value: number);
    get scale(): number | null;
    set scale(value: number);
    build(params: AnimeParams): AnimeInstance;
    clearTransforms(): void;
    run(params: AnimeParams): Promise<void>;
}
