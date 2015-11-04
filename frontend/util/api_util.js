var MomentActions = require('../actions/moment_actions');
var reqwest = require('reqwest');

var ApiUtil = {
  fetchMoments: function () {
    reqwest({
      type: 'GET',
      url: 'api/moments',
      type: 'json',
      success: function (moments) {
        MomentActions.receiveMoments(moments);
      },
      error: function (response) {
        debugger;
      }
    });
  }
};

module.exports = ApiUtil;