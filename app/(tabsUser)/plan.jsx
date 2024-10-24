import { View, Text,StyleSheet } from 'react-native'
import MapView from 'react-native-maps';
import React from 'react'

const Plan = () => {
  return (
    <View style={styles.container}>
      <MapView
       style={styles.map} ></MapView>
    </View>
  )
}

export default Plan
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});