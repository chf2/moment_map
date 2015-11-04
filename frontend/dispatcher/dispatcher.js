var EventEmitter = require('event-emitter');
var assign = require('object-assign');

var ACTION_DISPATCHED = "ACTION_DISPATCHED"
var _numCallbacks = 0;

var Dispatcher = assign({}, EventEmitter.prototype, {
  register: function (callback) {
    this.on(ACTION_DISPATCHED, callback);
    _numCallbacks++;
    return _numCallbacks;
  },

  dispatch: function () {
    this.emit(ACTION_DISPATCHED, payload);
  }
});

module.exports = Dispatcher;