var React = require('react');
var MomentIndexItem = require('./moment_index_item');

var MomentIndex = React.createClass({
  render: function () {
    return(
      <div id="moment-index">
        <h2>MomentIndex</h2>
        <ul>
          {
            this.props.moments.map(function(moment){
              return (<MomentIndexItem key={moment.id} moment={moment} />);
            })
          }
        </ul>
      </div>
    );
  }
});

module.exports = MomentIndex;