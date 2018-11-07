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
      latlong: 'lat,lng',
      venues: [],
      showVenues: []
    }
  }

  componentDidMount() {
    this.getVenues();

  }


  getVenues = () => {
    const endPoint = "https://api.foursquare.com/v2/venues/explore?";
    const params = {
      client_id: "EKGKFETBDEDSONFR1PMYDI1CXKCUMK5G1KZLHHVBSHNUHLN3",
      client_secret: "TPEDQBY5ORYEFAIXGS4NPPBTBOI2OAJRWURYVJGWQ0DEFRH2",
      ll: '-21.1877747,-41.8799408',
      query: 'sights',
      v: "20180211",
      limit: 5
    };

    axios.get(endPoint + new URLSearchParams(params))
      .then(response => {
        this.setState({
          venues: response.data.response.groups[0].items,
          showVenues: response.data.response.groups[0].items
        }, this.renderMap())
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
        <Map google={this.props.google} />
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAZiSEVBqwZwo7DtDC79JOoBcA2mLoDe1A'
})(App);
