var React = require('react');
var MomentIndex = require('./moment_index');
var MomentStore = require('../stores/moment');
var Map = require('./map');
var MomentActions = require('../actions/moment_actions');
var assign = require('object-assign');

var Search = React.createClass({
  getInitialState: function () {
    return ({ moments: [], params: { emotion: 'All' } });
  },

  componentDidMount: function () {
    MomentStore.addChangeListener(this.momentsChanged);
  },

  componentWillUnmount: function () {
    MomentStore.removeChangeListener(this.momentsChanged);
  },

  momentsChanged: function () {
    this.setState({ moments: MomentStore.all() });
  },

  updateParams: function (newParams) {
    this.setState(
      { params: assign({}, this.state.params, newParams) },
      function () {
        MomentActions.fetchMoments(this.state.params);
      }
    );
  },

  render: function () {
    return(
      <div id="search-container">
        <Map moments={this.state.moments} update={this.updateParams} />
        <MomentIndex moments={this.state.moments} update={this.updateParams} />
      </div>
    );
  }
});

module.exports = Search;