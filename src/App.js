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
      venues: []
    }
  }
  componentDidMount() {
    this.getVenues();
  }

  getVenues = () => {
    const clientId = "EKGKFETBDEDSONFR1PMYDI1CXKCUMK5G1KZLHHVBSHNUHLN3";
    const clientSecret = "TPEDQBY5ORYEFAIXGS4NPPBTBOI2OAJRWURYVJGWQ0DEFRH2";
    const endPoint = "https://api.foursquare.com/v2/venues/search";

  axios
  .get(endPoint , {
      params: {
        client_id: clientId,
        client_secret: clientSecret,
        v: "20180323",
        limit: 1,
        ll: "-21.1877747,-41.8799408",
        query: "coffee"
      }
    })
    .then(res => {
      const venueId = res.data.response.venues['0'].id;
      return axios.get(`https://api.foursquare.com/v2/venues/${venueId}`, {
        params: {
          client_id: clientId,
          client_secret: clientSecret,
          v: "20180323"
        }
      });
    })
      .then(response => {
        this.setState({
          venues: response.data.response.groups[0].items,
        })
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
        <Map google={this.props.google} venues={this.state.venues}/>
        
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAZiSEVBqwZwo7DtDC79JOoBcA2mLoDe1A'
})(App);
