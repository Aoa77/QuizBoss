const DEFAULT_LENGTH = 8;

export default function generateRandomString(
    length: number = DEFAULT_LENGTH,
): string {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength),
        );
    }
    return result;
}
