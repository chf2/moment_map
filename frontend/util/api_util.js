var MomentActions = require('../actions/moment_actions');
var zepto = require('npm-zepto');

var ApiUtil = {
  fetchMoments: function () {
    $.ajax({
      type: 'GET',
      url: 'api/moments',
      dataType: 'json',
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