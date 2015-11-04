var React = require('react');
var ReactDOM = require('react-dom');
var Map = require('./components/map');
var MomentIndex = require('./components/moment_index');

var MyComponent = React.createClass({
  render: function () {
    return(
      <div id="content-container">
        <h2>Hello World</h2>
        <Map />
        <MomentIndex />
      </div>
    )
  }
});

document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(<MyComponent />, document.getElementById('main'));
});
