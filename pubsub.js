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

    off: function (event, callback) {
        if (this._events[event]) {
            var index = this._events[event].indexOf(callback);

            if (index !== -1) {
                this._events[event].splice(index);
            }
        }
    },

    emit: function (event) {
        var args = Array.prototype.slice.call(arguments, 1);

        if (this._events[event]) {
            this._events[event].forEach(function (callback) {
                callback.apply(undefined, args);
            });
        }
    }
};

if (module) module.exports = PubSub;
