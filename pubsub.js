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
        var ctx = this;

        var cb = function () {
            callback.apply(undefined, arguments);
            ctx.off(event, cb);
        };

        this.on(event, cb);
    },

    off: function (event, callback) {
        this._forEachListener(event, function (listener, index) {
            if (listener === callback) {
                this._events[event][index] = undefined;
            }
        });
    },

    emit: function (event) {
        var args = Array.prototype.slice.call(arguments, 1);

        this._forEachListener(event, function (listener) {
            if (typeof listener === 'function') {
                listener.apply(undefined, args);
            }
        });
    },

    _forEachListener: function (event, callback) {
        if (this._events[event]) {
            for (var i = 0, len = this._events[event].length; i < len; i++) {
                callback.call(this, this._events[event][i], i);
            }
        }
    }
};

module.exports = PubSub;
