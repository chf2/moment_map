var React = require('react');

var MomentIndexItem = React.createClass({
  render: function () {
    var moment = this.props.moment;
    var momentCreated = new Date(moment.created_at);
    var klass = "moment-index-item emotion-" + moment.emotion.toLowerCase();

    return(
      <div className={klass}>
        <div className="moment-index-item-body">
          {moment.body}
        </div>
        <div className="moment-index-item-detail">
          Posted by {moment.author} on <br></br>{momentCreated.toDateString()}
        </div>
      </div>
    );
  }
});

module.exports = MomentIndexItem;