import React, { Component } from 'react';
import ReactDOM from 'react-dom';


export default class Map extends Component {

  state = {
    position: [
      // position : determines the position of the items marked later
      { name: "Cinemaxx Glória", location: { lat: -21.20983949, lng: -41.88704682 } },
      { name: "Cristo Redentor", location: { lat: -21.20097577, lng: -41.88172988 } },
      { name: "São José do Avaí", location: { lat: -21.20188602, lng: -41.88968531 } },
      { name: "Prefeitura Municipal", location: { lat: -21.19874516, lng: -41.904684232 } },
      { name: "Centro Poliesportivo", location: { lat: -21.19495355, lng: -41.90685375 } }
    ],
    query: '',
    markers: [],
    infowindow: new this.props.google.maps.InfoWindow(),
    enhanceIcon: null
  }

  componentDidMount() {
    this.loadMap()
    this.onclickPosition()
    // Create a "highlighted location" marker color for when the user
    // clicks on the marker.
    this.setState({ enhanceIcon: this.makeMarkerIcon('42be3f') })
  }

  loadMap() {
    if (this.props && this.props.google) {
      const { google } = this.props
      const maps = google.maps

      const mapRef = this.refs.map
      const node = ReactDOM.findDOMNode(mapRef)

      const mapConfig = Object.assign({}, {
        center: { lat: -21.1877747, lng: -41.8799408 },
        zoom: 12,
        mapTypeId: 'roadmap'
      })

      this.map = new maps.Map(node, mapConfig)
      this.addMarkers()
    }

  }

  onclickPosition = () => {
    const that = this
    const { infowindow } = this.state

    const displayInfowindow = (e) => {
      const { markers } = this.state
      const markerInd =
        markers.findIndex(mk => mk.title.toLowerCase() === e.target.innerText.toLowerCase())
      that.populateInfoWindow(markers[markerInd], infowindow)
    }
    document.querySelector('.position-list').addEventListener('click', function (e) {
      if (e.target && e.target.nodeName === "LI") {
        displayInfowindow(e)
      }
    })
  }

  handleValueChange = (e) => {
    this.setState({ query: e.target.value })
  }

  addMarkers = () => {
    const { google } = this.props
    let { infowindow } = this.state
    const bounds = new google.maps.LatLngBounds()

    this.state.position.forEach((location, ind) => {
      const marker = new google.maps.Marker({
        position: { lat: location.location.lat, lng: location.location.lng },
        map: this.map,
        title: location.name
      })

      marker.addListener('click', () => {
        this.populateInfoWindow(marker, infowindow)
      })
      this.setState((state) => ({
        markers: [...state.markers, marker]
      }))
      bounds.extend(marker.position)
    })
    this.map.fitBounds(bounds)
  }

  populateInfoWindow = (marker, infowindow) => {
    const defaultIcon = marker.getIcon()
    const { enhanceIcon, markers } = this.state
    // Check to make sure the infowindow is not already opened on this marker.
    if (infowindow.marker !== marker) {
      // reset the color of previous marker
      if (infowindow.marker) {
        const ind = markers.findIndex(m => m.title === infowindow.marker.title)
        markers[ind].setIcon(defaultIcon)
      }
      // change marker icon color of clicked marker
      marker.setIcon(enhanceIcon)
      infowindow.marker = marker
      infowindow.setContent(`<h3>${marker.title}</h3><h4>You are here!</h4>`)
      infowindow.open(this.map, marker)
      // Make sure the marker property is cleared if the infowindow is closed.
      infowindow.addListener('closeclick', function () {
        infowindow.marker = null
      })
    }
  }

  makeMarkerIcon = (markerColor) => {
    const { google } = this.props
    let markerImage = new google.maps.MarkerImage(
      'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|' + markerColor +
      '|40|_|%E2%80%A2',
      new google.maps.Size(21, 34),
      new google.maps.Point(0, 0),
      new google.maps.Point(10, 34),
      new google.maps.Size(21, 34));
    return markerImage;
  }

  render() {
    const { position, query, markers, infowindow } = this.state
    if (query) {
      position.forEach((l, i) => {
        if (l.name.toLowerCase().includes(query.toLowerCase())) {
          markers[i].setVisible(true)
        } else {
          if (infowindow.marker === markers[i]) {
            // close the info window if marker removed
            infowindow.close()
          }
          markers[i].setVisible(false)
        }
      })
    } else {
      position.forEach((l, i) => {
        if (markers.length && markers[i]) {
          markers[i].setVisible(true)
        }
      })
    }

    return (
      <div>
        <div aria-label="container" className="container">
          <div className="text-field">
            <input role="search" type='text'
              value={this.state.value} 
              onChange={this.handleValueChange} placeholder="Search..." title="Type in a local"/>
            <ul className="position-list" >{
              markers.filter(mk => mk.getVisible()).map((mk, i) =>
                (<li aria-label="menu position" key={i}>{mk.title}</li>))
            }</ul>
          </div>
          <div role="application" className="map" ref="map">
            Loading ...
          </div>
        </div>
      </div>
    )
  }
}