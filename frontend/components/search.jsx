var React = require('react');
var MomentIndex = require('./moment_index');
var MomentStore = require('../stores/moment');
var Map = require('./map');

var Search = React.createClass({
  getInitialState: function () {
    return ({ moments: [] });
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

  render: function () {
    return(
      <div id="search-container">
        <Map moments={this.state.moments} />
        <MomentIndex moments={this.state.moments} />
      </div>
    );
  }
});

module.exports = Search;