import Xref from "../../core/hooks/Xref";

export async function fadeIn<T>(
    xref: Xref<T>,
    multiplier?: number,
): Promise<void> {
    const params = xref.createAnimeParams(
        {
            easing: FADE.EASING,
            opacity: FADE.IN,
        },
        { duration: FADE.DURATION, multiplier },
    );
    await xref.animeX(params);
}

export async function fadeOut<T>(
    xref: Xref<T>,
    multiplier?: number,
): Promise<void> {
    const params = xref.createAnimeParams(
        {
            easing: FADE.EASING,
            opacity: FADE.OUT,
        },
        { duration: FADE.DURATION, multiplier },
    );
    await xref.animeX(params);
}
