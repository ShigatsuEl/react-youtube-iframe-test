function load(src, cb) {
    let head = document.head || document.getElementsByTagName("head")[0];
    let script = document.createElement("script");

    script.type = "text/javascript";
    script.async = true;
    script.src = src;

    let onend = "onload" in script ? stdOnEnd : ieOnEnd;
    onend(script, cb);

    head.appendChild(script);
}

function stdOnEnd(script, cb) {
    script.onload = function () {
        this.onerror = this.onload = null;
        cb(null, script);
    };
    script.onerror = function () {
        // this.onload = null here is necessary
        // because even IE9 works not like others
        this.onerror = this.onload = null;
        cb(new Error("Failed to load " + this.src), script);
    };
}

function ieOnEnd(script, cb) {
    script.onreadystatechange = function () {
        if (this.readyState !== "complete" && this.readyState !== "loaded")
            return;
        this.onreadystatechange = null;
        cb(null, script); // there is no way to catch loading errors in IE8
    };
}

export default load;
