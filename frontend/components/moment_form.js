var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');

var MomentForm = React.createClass({
  mixins: [LinkedStateMixin],

  getInitialState: function () {
    return({
      author: '',
      emotion: '',
      body: '',
      lat: this.props.coords.lat,
      lng: this.props.coords.lng
    });
  },

  createMoment: function (e) {
    e.preventDefault();
    ApiUtil.createMoment(this.state);
  },

  updateBody: function (e) {
    this.setState({ body: e.currentTarget.value });
  },

  render: function () {
    return(
      <div className='modal-screen'>
        <div className='modal-content'>
          <form onSubmit={this.createMoment}>
            <label htmlFor="moment-author">Name:</label><br></br>
            <input 
              type="text" 
              name="moment-author"
              placeholder="what's your name?"
              valueLink={this.linkState('author')}>
            </input>

            <br></br>

            <label htmlFor="moment-emotion">How you felt:</label><br></br>
            <input 
              type="text" 
              name="moment-emotion" 
              placeholder="how did you feel in the moment?"
              valueLink={this.linkState('emotion')}>
            </input>

            <br></br>

            <textarea 
              name="moment-body" 
              onChange={this.updateBody}>{this.state.body}</textarea>

            <br></br>

            <input type="submit" value="Submit"></input>

          </form>
        </div>
      </div>
    );
  }
});

module.exports = MomentForm;