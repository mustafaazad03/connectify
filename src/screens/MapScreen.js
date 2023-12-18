// @packages
import MapView, { Marker } from 'react-native-maps';
import React, { useCallback, useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity } from 'react-native';
// @scripts
import Colors from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import GetUserLocation from '../helpers/GetUserLocation';

const MapScreen = (props) => {
  const initialLocation = props.navigation.getParam('initialLocation');
  const readonly = props.navigation.getParam('readonly');

  const [selectedLocation, setSelectedLocation] = useState(
    initialLocation ? initialLocation.selectedLocation : ''
  );
  const [mapRegion, setMapRegion] = useState();

  let markerCoordinates;
  let immediateLocation;
  useEffect(() => {
      if (!selectedLocation) {
        async function fetchData() {
          immediateLocation = await GetUserLocation();
          setMapRegion({
            latitude: immediateLocation ? immediateLocation.latitude : 35.846, 
            longitude: immediateLocation ? immediateLocation.longitude : -86.3649, 
            latitudeDelta: immediateLocation ? 0.0922 : 38.0, 
            longitudeDelta: immediateLocation? 0.0421 : 38.0, 
            });
            markerCoordinates = {
              latitude: immediateLocation.latitude,
              longitude: immediateLocation.longitude,
            };
        }
        fetchData();
      } else {
        setMapRegion({
          latitude: selectedLocation.latitude, 
          longitude: selectedLocation.longitude, 
          latitudeDelta: 0.0922, 
          longitudeDelta: 0.0421, 
          });
      }
      return () => {
        immediateLocation = false;
      }
    }, [selectedLocation]);

  if (selectedLocation) {

    markerCoordinates = {
      latitude: selectedLocation.latitude,
      longitude: selectedLocation.longitude,
    };
  }

  const saveSelectedLocation = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert('No location selected');
      return;
    }
    props.navigation.navigate('NewLocation', {
      pickedLocation: selectedLocation,
    });
  }, [selectedLocation]);

  useEffect(() => {
    props.navigation.setParams({ saveLocation: saveSelectedLocation });
  }, [saveSelectedLocation]);

  const selectLocation = (event) => {
    if (readonly) return;

    setSelectedLocation({
      latitude: event.nativeEvent.coordinate.latitude,
      longitude: event.nativeEvent.coordinate.longitude,
    });
    console.log(selectedLocation);
  };

  return (
    <MapView style={styles.map} region={mapRegion} onPress={selectLocation}>
      {markerCoordinates && (
        <Marker
          title="Selected"
          coordinate={markerCoordinates}
          draggable
        ></Marker>
      )}
    </MapView>
  );
};

MapScreen.navigationOptions = (navData) => {
  const saveFn = navData.navigation.getParam('saveLocation');
  const readonly = navData.navigation.getParam('readonly');
  if (readonly) return {};

  return {
    headerRight: (
         <TouchableOpacity style={styles.headerButton} onPress={saveFn}>
           <Text style={styles.headerButtonText}>Save</Text>
           <Ionicons name="save-outline" size={22} color={Colors.backgroundColor} style={styles.icon}/>
         </TouchableOpacity>
    ),
  };
};

const styles = StyleSheet.create({
  headerButton: {
    flexDirection: 'row',
    marginHorizontal: 20,
    alignItems: 'center',
  },
  headerButtonText: {
    fontSize: 18,
    marginRight: 3,
    color: Colors.backgroundColor,
  },
  map: {
    flex: 1,
  },
});

export default MapScreen;
