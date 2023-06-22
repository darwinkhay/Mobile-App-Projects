/**
 * https://blog.expo.dev/building-a-coffee-map-with-react-native-and-expo-a00b8f60a4c6
 */
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import MapView, {Marker} from 'react-native-maps';
 //const Marker = MapView.Marker;
 

export default class Map extends Component {
  renderMarkers() {
    return this.props.places.map((place) => {
        return (
      <Marker title={place.name} coordinate={place.coords} />
        )
    })
  }
  
  render() {

    const {intialRegion} = this.props.intialRegion
    return (
      <MapView
        style={styles.container}
        
        showsUserLocation = 'true'
        
        showsCompass='false'
        userInterfaceStyle='dark'
        intialRegion={intialRegion}
      >
        {this.renderMarkers()}
      </MapView>
    )
  }
}
const styles = {
  container: {
    width: '100%',
    height: '100%',
    flex: 1,
  }
}

