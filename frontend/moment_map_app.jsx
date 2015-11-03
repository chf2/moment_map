var React = require('react');
var ReactDOM = require('react-dom');
var Map = require('./components/map');

var MyComponent = React.createClass({
  render: function () {
    return(
      <div>
        <h2>Hello World</h2>
        <Map />
      </div>
    )
  }
});

document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(<MyComponent />, document.getElementById('main'));
});
