var MomentConstants = require('../constants/moment_constants');
var Dispatcher = require('../dispatcher/dispatcher');

var ApiActions = {
  receiveMoments: function (moments) {
    Dispatcher.dispatch({
      actionType: MomentConstants.MOMENTS_RECEIVED,
      moments: moments
    });
  },

  receiveSingleMoment: function (moment) {
    Dispatcher.dispatch({
      actionType: MomentConstants.MOMENT_RECEIVED,
      moment: moment
    });
  }
};

module.exports = ApiActions;