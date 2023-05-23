import Emitter from "./emitter";
import loadYoutubeIframeAPI from "./loadYouTubeIfameAPI";
import YouTubePlayer from "./youTubePlayer";

let youtubeIframeAPI = undefined;

const youtubeIframeAPICaller = (maybeElementId, options = {}) => {
    const emitter = Emitter();

    if (!youtubeIframeAPI) {
        youtubeIframeAPI = loadYoutubeIframeAPI(emitter);
    }

    if (
        typeof maybeElementId === "string" &&
        !document.getElementById(maybeElementId)
    ) {
        console.log(`Element "${maybeElementId}" does not exist.`);
        return;
    }

    const playerAPIReady = new Promise((resolve) => {
        if (
            typeof maybeElementId === "object" &&
            maybeElementId.playVideo instanceof Function
        ) {
            const player = maybeElementId;

            resolve(player);
        } else {
            youtubeIframeAPI.then((YT) => {
                const player = new window.YT.Player(maybeElementId, options);

                emitter.on("ready", () => {
                    resolve(player);
                });
            });

            return null;
        }
    });

    const playerApi = YouTubePlayer.promisifyPlayer(playerAPIReady);

    playerApi.on = emitter.on;
    playerApi.off = emitter.off;

    return playerApi;
};

export default youtubeIframeAPICaller;
