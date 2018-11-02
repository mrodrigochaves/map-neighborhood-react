import React, { Component } from 'react';
import { GoogleApiWrapper } from 'google-maps-react';
import Map from './components/Map';
import Header from './components/Header';
import axios from 'axios';
import './css/main.css';


class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      latlong: 'lat,long',
      venues: []
    }
  }

  componentDidMount() {
    this.getLocation();

  }

  getLocation = () => {
    navigator.geolocation.getCurrentPosition(response => {
      this.setState({
        latlong: response.coords.latitude + "," + response.coords.latitude
      }, () => {
        this.getVenues("tech")
      });
    });

  };


  getVenues = (query) => {
    const endPoint = "https://api.foursquare.com/v2/venues/explore?";
    const params = {
      client_id: "EKGKFETBDEDSONFR1PMYDI1CXKCUMK5G1KZLHHVBSHNUHLN3",
      client_secret: "TPEDQBY5ORYEFAIXGS4NPPBTBOI2OAJRWURYVJGWQ0DEFRH2",
      ll: this.state.latlong,
      query: query,
      v: "20180211"
    };

    axios.get(endPoint + new URLSearchParams(params)).then(response => {
      this.setState({ venues: response.data.response.groups[0].items })
    });
  }

  render() {

    return (
      <div>
        <div className={"menu"} tabIndex={"0"}>
        </div>
        <Header />
        <Map google={this.props.google} />
          {this.state.venues.map(venue => {
            return <li>{venue.venue.name} Location:
        {venue.venue.location.address}</li>
          })}        
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAZiSEVBqwZwo7DtDC79JOoBcA2mLoDe1A'
})(App);
