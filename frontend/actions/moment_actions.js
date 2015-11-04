var MomentConstants = require('../constants/moment_constants');
var Dispatcher = require('../dispatcher/dispatcher');

var MomentActions = {
  receiveMoments: function (moments) {
    Dispatcher.dispatch({
      actionType: MomentConstants.MOMENTS_RECEIVED,
      moments: moments
    });
  }
};

module.exports = MomentActions;