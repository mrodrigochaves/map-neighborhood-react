import React, { Component } from 'react';
import { GoogleApiWrapper } from 'google-maps-react';
import Header from './components/header';
import Map from './components/map';
import axios from 'axios';
import './css/main.css';


class App extends Component {
  state = {
    venues: [],
    axiosError: false
  };

  componentDidMount() {
    const endPoint = 'https://api.foursquare.com/v2/venues/explore?';
    const config = {
      params: {
        client_id: 'EKGKFETBDEDSONFR1PMYDI1CXKCUMK5G1KZLHHVBSHNUHLN3',
        client_secret: 'TPEDQBY5ORYEFAIXGS4NPPBTBOI2OAJRWURYVJGWQ0DEFRH2',
        v: '20180323',
        ll: '-21.1877747,-41.8799408',
        near: 'Itaperuna',
        limit: 10
      }
    };

    axios
      .get(endPoint, config)
      .then(response => {
        const venuesResponse = response.data.response.groups['0'].items; // We took the places

        let venuesArray = venuesResponse.map(venue => venue.venue); // We cleaned the result to have an array with the objects of each place only
        console.log(venuesArray);

        this.setState({ venues: venuesArray, axiosError: false }); // We saved this in state
      })
      .catch(error => {
        alert(`Sorry, we could not fetch Foursquare data!`)
        console.log("Show Foursquare error! " + error)
      })
  }

  render() {

    return (
      <div >
        <Header />
        <Map google={this.props.google} venues={this.props.venues}/>
      </div>

    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAZiSEVBqwZwo7DtDC79JOoBcA2mLoDe1A'
})(App);
