// @packages
import { Alert} from 'react-native';
import * as Location from 'expo-location';

// GetUserLocation: returns an object {} w/ attributes latitude: and longitude: of the user
const GetUserLocation = async () => {

    const verifyPermissions = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
          Alert.alert(
          'Insufficient permissions',
          'Sorry, you need to grant location permissions to use this app',
          [{ text: 'Okay' }] 
          );
          return false;
      }
      return true;
    };

    const permission = await verifyPermissions();
    if (!permission) return;

    try {
      const location = await Location.getCurrentPositionAsync({timeout: 0,});
      console.log("=== GetUserLocation.js ===", location);

      return {latitude: location.coords.latitude, longitude: location.coords.longitude};

    } catch (err) {
      Alert.alert(
            'Could not fetch location!',
            'Please try again later or pick a location on the map.',
            [{ text: 'Okay' }]
          );
        }
  };

export default GetUserLocation; 