export class HttpUtility {
    public static parseQueryString(query: string): Map<string, string> {
        const map = new Map<string, string>();
        query = query.trim();
        if (query.length === 0) {
            return map;
        }
        if (query[0] !== "?") {
            throw new Error("Query string must start with '?'");
        }
        const pairs: string[] = query.substring(1).split("&");
        for (const pair of pairs) {
            const parts: string[] = pair.split("=");
            if (parts.length !== 2) {
                throw new Error("Invalid query string format");
            }
            map.set(parts[0], parts[1]);
        }
        return map;
    }
}
