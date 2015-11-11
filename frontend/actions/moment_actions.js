var MomentConstants = require('../constants/moment_constants');
var Dispatcher = require('../dispatcher/dispatcher');
var ApiUtil = require('../util/api_util');

var MomentActions = {
  createMoment: function (moment) {
    ApiUtil.createMoment(moment);
    Dispatcher.dispatch({
      actionType: MomentConstants.MOMENT_CREATED,
      moment: moment
    });
  },

  fetchMoments: function (params) {
    ApiUtil.fetchMoments(params);
    Dispatcher.dispatch({
      actionType: MomentConstants.MOMENTS_FETCHED
    });
  }

};

module.exports = MomentActions;