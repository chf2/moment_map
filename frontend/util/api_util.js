var ApiActions = require('../actions/api_actions');
var reqwest = require('reqwest');

var ApiUtil = {
  fetchMoments: function (params) {
    reqwest({
      method: 'GET',
      url: 'api/moments',
      data: { filters: params },
      type: 'json',
      success: function (moments) {
        ApiActions.receiveMoments(moments);
      },
      error: function (response) {
        console.log("Sorry, something went wrong!");
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
        ApiActions.receiveSingleMoment(moment);
      },
      error: function (response) {
        console.log("Sorry, something went wrong!");
      }
    })
  }
};

module.exports = ApiUtil;