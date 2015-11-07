var MomentActions = require('../actions/moment_actions');
var reqwest = require('reqwest');

var ApiUtil = {
  fetchMoments: function () {
    reqwest({
      method: 'GET',
      url: 'api/moments',
      type: 'json',
      success: function (moments) {
        MomentActions.receiveMoments(moments);
      },
      error: function (response) {
        debugger;
      }
    });
  },

  createMoment: function (moment) {
    reqwest({
      method: 'post',
      url: 'api/moments',
      type: 'json',
      data: moment,
      success: function (moment) {
        MomentActions.receiveSingleMoment(moment);
      },
      error: function (response) {
        debugger
      }
    })
  }
};

module.exports = ApiUtil;