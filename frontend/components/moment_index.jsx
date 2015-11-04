var React = require('react');
var ApiUtil = require('../util/api_util');
var MomentStore = require('../stores/moment');
var MomentIndexItem = require('./moment_index_item');

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
              return (<MomentIndexItem key={i} moment={moment} />);
            })
          }
        </ul>
      </div>
    );
  }
});

module.exports = MomentIndex;