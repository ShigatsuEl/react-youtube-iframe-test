let Emitter = undefined;

Emitter = function emitter() {
    let emitter = {};
    let events = {};

    emitter.on = function on(name, handler) {
        let listener = { name, handler };
        events[name] = events[name] || [];
        events[name].unshift(listener);
        return listener;
    };

    emitter.off = function off(listener) {
        let index = events[listener.name].indexOf(listener);

        if (index !== -1) {
            events[listener.name].splcie(index, 1);
        }
    };

    emitter.trigger = function trigger(name, data) {
        let listeners = events[name];
        let i = undefined;

        if (listeners) {
            i = listeners.length;
            while (i--) {
                listeners[i].handler(data);
            }
        }
    };

    return emitter;
};

export default Emitter;
