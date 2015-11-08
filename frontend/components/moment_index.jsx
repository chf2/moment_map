var React = require('react');
var MomentIndexItem = require('./moment_index_item');

var MomentIndex = React.createClass({
  updateSelection: function (e) {
    var selection = e.currentTarget.value;
    this.props.update({ emotion: selection });
  },

  render: function () {
    var noMomentsFound = ""
    if (this.props.moments.length === 0) {
      noMomentsFound += "No moments found! Do you have one to share?"
    }

    return(
      <div id="moment-index">
        <h3>Moments Nearby</h3>
        <div className="moment-search">
          <label htmlFor="moment-search-select">Filter Moments:</label>
          <select id='moment-emotion' onChange={this.updateSelection}>
            <option value={'All'}>All</option>
            {
              window.EMOTIONS.map(function (emotion, i) {                                      
                return <option value={emotion} key={i}>{emotion}</option>
              })
            }
          </select>
        </div>
        {noMomentsFound}
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