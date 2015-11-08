var React = require('react');
var ReactDOM = require('react-dom');
var Search = require('./components/search');

var MyComponent = React.createClass({
  render: function () {
    return(
      <div id="content-container">
        <div className="header">
          <h1>Moment Map</h1>
          <span>| Built on chf-rack. <a href="/about">Learn more.</a></span>
        </div>
        <Search />
      </div>
    );
  }
});

document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(<MyComponent />, document.getElementById('main'));
});
