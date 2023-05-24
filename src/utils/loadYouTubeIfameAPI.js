import load from "./loadScript";

function loadYoutubeIframeAPI(emitter) {
    const iframeAPIReady = new Promise((resolve) => {
        if (
            window.YT &&
            window.YT.Player &&
            window.YT.Player instanceof Function
        ) {
            resolve(window.YT);
            return;
        } else {
            const protocol =
                window.location.protocol === "http:" ? "http:" : "https:";

            load(`${protocol}//www.youtube.com/iframe_api`, (error) => {
                if (error) {
                    emitter.trigger("error", error);
                }
            });
        }

        const previous = window.onYouTubeIframeAPIReady;

        window.onYouTubeIframeAPIReady = () => {
            if (previous) {
                previous();
            }

            resolve(window.YT);
        };
    });

    return iframeAPIReady;
}

export default loadYoutubeIframeAPI;
