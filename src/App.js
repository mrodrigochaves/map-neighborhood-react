import React, { Component } from 'react';
import { GoogleApiWrapper } from 'google-maps-react';
import Header from './components/Header';
import Map from './components/Map';
import ErrorBoundary from './data/ErrorBoundary';
import './css/main.css';

class App extends Component {
 
  render() {

    return (
      <ErrorBoundary >
        <Header />
        <Map google={this.props.google} />
      </ErrorBoundary>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAZiSEVBqwZwo7DtDC79JOoBcA2mLoDe1A'
})(App);
