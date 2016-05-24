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
        if (this._events[event]) {
            for (var i = 0, len = this._events[event].length; i < len; i++) {
                if (this._events[event][i] === callback) {
                    this._events[event][i] = undefined;
                }
            }
        }
    },

    emit: function (event) {
        var args = Array.prototype.slice.call(arguments, 1);

        if (this._events[event]) {
            for (var i = 0, len = this._events[event].length; i < len; i++) {
                if (typeof this._events[event][i] === 'function') {
                    this._events[event][i].apply(undefined, args);
                }
            }
        }
    }
};

module.exports = PubSub;
