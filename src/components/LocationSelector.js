// @packages
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, View } from 'react-native';
// @scripts
import Colors from '../constants/Colors';
import MapPreview from './MapPreview';
import OutlinedButton from './UI/OutlinedButton';
import GetUserLocation from '../helpers/GetUserLocation';

const LocationSelector = (props) => {
  const [chosenLocation, setChosenLocation] = useState();
  const [isFetching, setIsFetching] = useState(false);

  const mapChosenLocation = props.navigation.getParam('pickedLocation');

  const { onLocationChosen } = props;

  useEffect(() => {
    if (mapChosenLocation) {
      setChosenLocation(mapChosenLocation);
      props.onLocationChosen(mapChosenLocation);
    }
  }, [mapChosenLocation, onLocationChosen]);

  const getLocationHandler = async () => {
    try {
      setIsFetching(true);
      const location = await GetUserLocation();
      console.log(location);
      setChosenLocation({
        latitude: location.latitude,
        longitude: location.longitude,
      });
      props.onLocationChosen({
        latitude: location.latitude,
        longitude: location.longitude,
      });
    } catch (err) {
      Alert.alert(
        'Could not fetch location!',
        'Please try again later or pick a location on the map.',
        [{ text: 'Okay' }]
      );
    }
    setIsFetching(false);
  };

  const pickOnMapHandler = () => {
    if (chosenLocation) {
      const selectedLocation = {
        latitude: chosenLocation.latitude,
        longitude: chosenLocation.longitude,
      };
      props.navigation.navigate('Map', {
        initialLocation: { selectedLocation },
      });
    }
    props.navigation.navigate('Map');
  };

  return (
    <View style={styles.locationSelector}>
      <MapPreview
        style={styles.mapPreview}
        location={chosenLocation}
        onPress={pickOnMapHandler}
      >
        {isFetching ? (
          <ActivityIndicator size="large" color={Colors.primary} />
        ) : (
          <Text style={styles.text}>No location chosen yet</Text>
        )}
      </MapPreview>
      <View style={styles.actions}>
        <OutlinedButton icon="location-outline" onPress={getLocationHandler}>
          My Location
        </OutlinedButton>
        <OutlinedButton icon="map-outline" onPress={pickOnMapHandler}>
          Use Map
        </OutlinedButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  actions: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  locationSelector: {
    marginBottom: 10,
  },
  mapPreview: {
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 0.75,
    height: 175,
    justifyContent: 'center',
    marginBottom: 10,
    width: '100%',
  },
  text: {
    color: '#fff',
    justifyContent: 'center',
  },
});

export default LocationSelector;
