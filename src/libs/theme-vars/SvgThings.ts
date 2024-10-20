export class SvgThings {
    public static viewBox(values: number[]): string {
        const [minX, minY, width, height] = values;
        return `${minX} ${minY} ${width} ${height}`;
    }
    public static readonly xmlns = "http://www.w3.org/2000/svg";
}
