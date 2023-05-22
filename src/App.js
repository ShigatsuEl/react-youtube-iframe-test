import { useCallback, useEffect } from "react";
import "./App.css";

const playerOpts = {
    videoId: "",
};

function App() {
    let internalPlayer = null;
    let destroyPlayerPromise = undefined;

    const createPlayer = useCallback(() => {
        if (typeof document === "undefined") return;
        if (destroyPlayerPromise) {
            // We need to first await the existing player to be destroyed before
            // we can re-create it.
            destroyPlayerPromise.then(createPlayer);
            return;
        }
    }, [destroyPlayerPromise]);

    const destroyPlayer = () => {
        if (internalPlayer) {
            destroyPlayerPromise = internalPlayer
                .destroy()
                .then(() => (destroyPlayerPromise = undefined));
            return destroyPlayerPromise;
        }
        return Promise.resolve();
    };

    const resetPlayer = () => {
        destroyPlayer().then(createPlayer);
    };

    useEffect(() => {
        createPlayer();
    }, [createPlayer]);

    return <div className="App"></div>;
}

export default App;
