
export function SocialShare() {
    return (
        <button className="share"
            onPointerDown={() => {
                if (navigator.share) {
                    navigator
                        .share({
                            title: document.title,
                            text: "Hello World",
                            url: window.location.href,
                        })
                        .then(() => console.info("Successful share"))
                        .catch((error) => console.error("Error sharing:", error));
                }
            }}>
            SHARE
        </button>
    );
}
