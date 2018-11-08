import React, { Component } from 'react';
import { GoogleApiWrapper } from 'google-maps-react';
import Map from './components/Map';
import Header from './components/Header';
import './css/main.css';

class App extends Component {

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
