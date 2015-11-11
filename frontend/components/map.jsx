var React = require('react');
var MomentStore = require('../stores/moment');
var MomentForm = require('./moment_form');

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
    this.map.addListener('idle', this.updateBounds);
    MomentStore.addPinListener(this.updateActivePin);
  },

  componentDidUpdate: function () {
    this.updateMarkers();
  },

  componentWillUnmount: function () {
    MomentStore.removePinListener(this.updateActivePin);
  },

  handleMapClick: function (e) {
    var latLng = e.latLng;
    this.setState({
      clickedCoords: {
        lat: latLng.lat(),
        lng: latLng.lng()
      },
      formActive: true
    });
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

  formClosed: function () {
    this.setState({
      formActive: false,
      clickedCoords: {}
    });
  },

  updateActivePin: function () {
    var activePin = MomentStore.getActivePin();
    this.markers.forEach(function(marker){
      if (marker.momentId === activePin) {
        marker.setAnimation(google.maps.Animation.BOUNCE);
      } else if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
      }
    });
  },

  updateBounds: function () {
    var boundsObj = this.map.getBounds();
    var northEast = boundsObj.getNorthEast();
    var southWest = boundsObj.getSouthWest();
    var bounds = 
      {
        northEast: { 
          lat: northEast.lat(), 
          lng: northEast.lng() 
        },
        southWest: {
          lat: southWest.lat(),
          lng: southWest.lng()
        }
      };
    this.props.update({ bounds: bounds });
  },

  updateMarkers: function () {
    var moments = this.props.moments;
    var seenIds = [];
    for(var i = 0; i < this.markers.length; i++) {
      if (!MomentStore.findById(this.markers[i].momentId)) {
        this.markers[i].setMap(null);
        this.markers[i] = null;
      } else {
        seenIds.push(this.markers[i].momentId);
      }
    }
    // Remove nulls
    this.markers = this.markers.filter(function(marker){ return marker }); 

    moments.forEach(function(moment){
      if (seenIds.indexOf(moment.id) !== -1) { return; }
      var marker = this.createMarker(moment);
      this.markers.push(marker);
    }.bind(this));
  },

  render: function () {
    var formModal = "";
    if (this.state.formActive) {
      formModal = (
        <MomentForm 
          coords={this.state.clickedCoords} 
          closeForm={this.formClosed} />
      );
    }
    return (
      <div className='map-container'>
        <div>{formModal}</div>
        Click on the map to create a new moment!
        <div id="map" ref="map"></div>
      </div>
    );
  }
});

module.exports = Map;