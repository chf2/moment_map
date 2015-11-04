var Dispatcher = require('../dispatcher/dispatcher');
var EventEmitter = require('event-emitter');
var MomentConstants = require('../constants/moment_constants')
var assign = require('object-assign');

var _moments = [];

var resetMoments = function (moments) {
  _moments = moments;
};

var MOMENT_CHANGE_EVENT = "MOMENT_CHANGE_EVENT";

var MomentStore = assign({}, EventEmitter.prototype, {
  all: function () {
    return _moments.slice();
  },

  addChangeListener: function (callback) {
    this.on(MOMENT_CHANGE_EVENT, callback);
  },

  removeChangeListener: function (callback) {
    this.removeListener(MOMENT_CHANGE_EVENT, callback);
  },

  dispatcherId: Dispatcher.register(function(payload){
    if (payload.actionType === MomentConstants.MOMENTS_RECEIVED) {
      resetMoments(payload.moments);
      MomentStore.emit(MOMENT_CHANGE_EVENT);
    }
  })
});

module.exports = MomentStore;