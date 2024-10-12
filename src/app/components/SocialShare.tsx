
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
                        .then(() => console.log("Successful share"))
                        .catch((error) => console.log("Error sharing:", error));
                }
            }}>
            SHARE
        </button>
    );
}
