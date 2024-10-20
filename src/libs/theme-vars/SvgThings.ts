export class SvgThings {
    public static viewBox(
        minX: number,
        minY: number,
        width: number,
        height: number,
    ): string {
        return `${minX} ${minY} ${width} ${height}`;
    }
    public static readonly xmlns = "http://www.w3.org/2000/svg";
}
