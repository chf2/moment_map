var Dispatcher = require('../dispatcher/dispatcher');
var EventEmitter = require('events').EventEmitter;
var MomentConstants = require('../constants/moment_constants')
var assign = require('object-assign');

var _moments = [], _activePin = null;

var resetMoments = function (moments) {
  _moments = moments;
};

var addMoment = function (moment) {
  _moments.push(moment);
};

var toggleActivePin = function (id) {
  if (id === _activePin) {
    _activePin = null;
  } else {
    _activePin = id;
  }
};

var MOMENT_CHANGE_EVENT = "MOMENT_CHANGE_EVENT";
var PIN_CHANGE_EVENT = "PIN_CHANGE_EVENT";

var MomentStore = assign({}, EventEmitter.prototype, {
  all: function () {
    return _moments.slice();
  },

  getActivePin: function () {
    return _activePin;
  },

  addChangeListener: function (callback) {
    this.on(MOMENT_CHANGE_EVENT, callback);
  },

  addPinListener: function (callback) {
    this.on(PIN_CHANGE_EVENT, callback);
  },

  findById: function (id) {
    var foundMoment;
    _moments.forEach(function(moment){
      if (moment.id == id) {
        foundMoment = moment;
      }
    });
    return foundMoment;
  },

  removeChangeListener: function (callback) {
    this.removeListener(MOMENT_CHANGE_EVENT, callback);
  },

  removePinListener: function (callback) {
    this.removeListener(PIN_CHANGE_EVENT, callback);
  },

  dispatcherId: Dispatcher.register(function(payload){
    switch (payload.actionType) {
    case MomentConstants.MOMENTS_RECEIVED:
      resetMoments(payload.moments);
      MomentStore.emit(MOMENT_CHANGE_EVENT);
      break;
    case MomentConstants.MOMENT_RECEIVED:
      addMoment(payload.moment);
      MomentStore.emit(MOMENT_CHANGE_EVENT);
      break;
    case MomentConstants.TOGGLE_PIN_BOUNCE:
      toggleActivePin(payload.id);
      MomentStore.emit(PIN_CHANGE_EVENT);
      break;
    }
  })
});

module.exports = MomentStore;