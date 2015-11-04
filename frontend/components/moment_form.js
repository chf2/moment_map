var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');

var MomentForm = React.createClass({
  mixins: [LinkedStateMixin],

  getInitialState: function () {

  },

  render: function () {
    return(
      <div className='modal-screen'>
        <div className='modal-content'>
          <form>
            <
          </form>
        </div>
      </div>
    );
  }
});

module.exports = MomentForm;