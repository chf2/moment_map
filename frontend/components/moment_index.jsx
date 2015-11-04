var React = require('react');
var ApiUtil = require('../util/api_util');
var MomentStore = require('../stores/moment');

var MomentIndex = React.createClass({
  fetch: function (e) {
    e.preventDefault();
    ApiUtil.fetchMoments();
  },

  getInitialState: function () {
    return({ moments: [] });
  },

  _changed: function () {
    this.setState({ moments: MomentStore.all() });
  },

  componentDidMount: function () {
    MomentStore.addChangeListener(this._changed);
  },

  componentWillUnmount: function () {
    MomentStore.removeChangeListener(this._changed);
  },

  render: function () {
    return(
      <div id="moment-index">
        <h2>MomentIndex</h2>
        <button onClick={this.fetch}>Fetch!</button>
        <ul>
          {
            this.state.moments.map(function(moment, i){
              return (<li key={i}>{moment.author + " | " + moment.emotion}</li>);
            })
          }
        </ul>
      </div>
    );
  }
});

module.exports = MomentIndex;