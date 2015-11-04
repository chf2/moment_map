var React = require('react');
var MomentStore = require('../stores/moment');

var Map = React.createClass({
  getInitialState: function () {
    return({ formActive: false, clickedCoords: {} });
  },

  componentDidMount: function () {
    this.markers = [];
    var map = this.refs.map;
    var mapOptions = {
      center: {lat: 37.7758, lng: -122.435},
      zoom: 13
    };
    this.map = new google.maps.Map(map, mapOptions);
    this.map.addListener('click', this.handleMapClick);
    MomentStore.addChangeListener(this.updateMarkers);
  },

  handleMapClick: function (e) {
    var latLng = e.latLng
    this.setState({
      clickedCoords: {
        lat: latLng.lat(),
        lng: latLng.lng()
      });

  },

  componentWillUnmount: function () {
    MomentStore.removeChangeListener(this.updateMarkers);
  },

  createMarker: function (moment) {
    var marker = new google.maps.Marker({
        momentId: moment.id,
        position: { 
          lat: parseFloat(moment.lat), 
          lng: parseFloat(moment.lng) 
        },
        map: this.map,
        title: moment.author + ": " + moment.emotion
      });
    return marker;
  },

  updateMarkers: function () {
    var moments = MomentStore.all();
    var seenIds = [];
    for(var i = 0; i < this.markers.length; i++) {
      if (!MomentStore.findById(this.markers[i].momentId)) {
        this.markers[i].map = null;
        this.markers[i] = null;
      } else {
        seenIds.push(this.markers[i].momentId);
      }
    }

    moments.forEach(function(moment){
      if (seenIds.indexOf(moment.id) !== -1) { return; }
      var marker = this.createMarker(moment);
      this.markers.push(marker);
    }.bind(this));
  },

  render: function () {
    return (<div id="map" ref="map"></div>);
  }
});

module.exports = Map;