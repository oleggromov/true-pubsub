function PubSub () {
    this._events = {};
}

PubSub.prototype = {
    on: function (event, callback) {
        if (!this._events[event]) {
            this._events[event] = [];
        }

        this._events[event].push(callback);
    },

    once: function (event, callback) {
        var cb = (function () {
            callback.apply(undefined, arguments);
            this.off(event, cb);
        }).bind(this);

        this.on(event, cb);
    },

    off: function (event, callback) {
        if (this._events[event]) {
            var index = this._events[event].indexOf(callback);
            this._events[event][index] = undefined;
        }
    },

    emit: function (event) {
        var args = Array.prototype.slice.call(arguments, 1);

        if (this._events[event]) {
            this._events[event].forEach(function (callback) {
                if (typeof callback === 'function') {
                    callback.apply(undefined, args);
                }
            });
        }
    }
};

module.exports = PubSub;
