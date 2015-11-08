var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var ApiUtil = require('../util/api_util')

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

  cancel: function (e) {
    e.preventDefault();
    this.props.closeForm();
  },

  createMoment: function (e) {
    e.preventDefault();
    this.props.closeForm();
    ApiUtil.createMoment({ moment: this.state });
  },

  updateBody: function (e) {
    this.setState({ body: e.currentTarget.value });
  },

  render: function () {
    return(
      <div className='modal-screen'>
        <div className='modal-content'>
          <span className="form-header">Create a new moment</span>
          <form onSubmit={this.createMoment} className="clearfix">
            <label htmlFor="moment-author">Name </label>
            <input 
              type="text" 
              name="moment-author"
              placeholder="What's your name?"
              valueLink={this.linkState('author')}>
            </input>

            <br></br>

            <label htmlFor="moment-emotion">I felt </label>
            <select id='moment-emotion' valueLink={this.linkState("emotion")}>
              {
                window.EMOTIONS.map(function (emotion, i) {                                      
                  return <option value={emotion} key={i}>{emotion}</option>
                })
              }
            </select>

            <br></br>

            <textarea 
              name="moment-body" 
              valueLink={this.linkState('body')}
              placeholder="Tell us about it!"></textarea>

            <br></br>

            <input 
              className="form-button" 
              type="submit" 
              value="Create Moment">
            </input>
            <button className="form-button" onClick={this.cancel}>Cancel</button>
          </form>
        </div>
      </div>
    );
  }
});

module.exports = MomentForm;