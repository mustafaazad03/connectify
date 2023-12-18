// @packages
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
// @scripts
import LocationDetailScreen from '../screens/LocationDetailScreen';
import LocationsListScreen from '../screens/LocationsListScreen';
import MapScreen from '../screens/MapScreen';
import NewLocationScreen from '../screens/NewLocationScreen';
// @styles
import Colors from '../constants/Colors';

const LocationsNavigator = createStackNavigator(
  {
    Locations: LocationsListScreen,
    LocationDetail: LocationDetailScreen,
    Map: MapScreen,
    NewLocation: NewLocationScreen,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Colors.primary,
      },
      headerTintColor: Colors.backgroundColor,
    },
  }
);

export default createAppContainer(LocationsNavigator);
