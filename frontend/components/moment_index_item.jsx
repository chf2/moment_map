var React = require('react');

var MomentIndexItem = React.createClass({
  render: function () {
    return(
      <div className="moment-index-item">
        <p>Author: {this.props.moment.author}</p>
        <p>Emotion: {this.props.moment.emotion}</p>
        <p>{this.props.moment.body}</p>
      </div>
    );
  }
});

module.exports = MomentIndexItem;