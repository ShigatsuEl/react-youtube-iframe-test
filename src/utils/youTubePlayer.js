import functionNames from "./functionNames";

const YouTubePlayer = {};

YouTubePlayer.promisifyPlayer = (playerAPIReady) => {
    const functions = {};

    for (const functionName of functionNames) {
        functions[functionName] = (...args) => {
            return playerAPIReady.then((player) => {
                return player[functionName].apply(player, args);
            });
        };
    }

    return functions;
};

export default YouTubePlayer;
