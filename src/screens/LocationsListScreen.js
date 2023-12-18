// @packages
import React, { useEffect } from 'react';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import {
  Button,
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Swipeable from 'react-native-gesture-handler/Swipeable';
// @scripts
import Colors from '../constants/Colors';
import HeaderButton from '../components/UI/HeaderButton';
import LocationItem from '../components/LocationItem';
import * as locationsActions from '../store/actions/locations-actions';

const LocationsListScreen = (props) => {
  const locations = useSelector((state) => state.locations.locations);
  const dispatch = useDispatch();
  let row = [];
  let prevOpenedRow;

  useEffect(() => {
    dispatch(locationsActions.loadLocations());
  }, [dispatch]);

  const closeRow = (id) => {
    if (prevOpenedRow && prevOpenedRow !== row[id]) {
      prevOpenedRow.close();
    }
    prevOpenedRow = row[id];
  };

  const onDelete = (id) => {
    closeRow(id);
    dispatch(locationsActions.removeLocation(id));
  };

  const renderRightView = (onDelete, id) => {
    return (
      <View
        style={{
          margin: 0,
          alignContent: 'center',
          justifyContent: 'center',
          width: 90,
        }}
      >
        <Button
          color="red"
          onPress={() => onDelete(id)}
          title="DELETE"
        ></Button>
      </View>
    );
  };

  const onSelectHandler = (itemData) => {
    props.navigation.navigate('LocationDetail', {
      locationTitle: itemData.item.title,
      locationId: itemData.item.id,
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.backgroundColor }}>
      <Text style={styles.prana}>Prana.io</Text>
      {locations.length > 0 ? (
        <FlatList
          data={locations}
          keyExtractor={(item) => item.id}
          renderItem={(itemData) => (
            <Swipeable
              renderRightActions={(progress, dragX) =>
                renderRightView(onDelete, itemData.item.id)
              }
              onSwipeableOpen={() => closeRow(itemData.item.id)}
              ref={(ref) => (row[itemData.item.id] = ref)}
              rightOpenValue={-100}
            >
              <LocationItem
                address={itemData.item.address}
                image={itemData.item.imageUri}
                onSelect={() => onSelectHandler(itemData)}
                title={itemData.item.title}
              />
            </Swipeable>
          )}
        />
      ) : (
        <View style={styles.noLocationsContainer}>
          <Text style={styles.noLocationsText}>
            Press the upper right + to begin
          </Text>
        </View>
      )}
    </View>
  );
};

LocationsListScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'Locations',
    headerLeft: () => (
      <Image
        source={require('../assets/leaf.png')}
        style={{ width: 26, height: 26, resizeMode: 'contain', marginLeft: 12 }}
      />
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Add Location"
          iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
          onPress={() => {
            navData.navigation.navigate('NewLocation');
          }}
          tintColor="black"
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  prana: {
    fontSize: 38,
    fontFamily: 'Cochin',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
    color: Colors.secondary,
  },
  noLocationsContainer: {
    flex: 0.75,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noLocationsText: {
    fontSize: 26,
    fontFamily: 'Cochin',
    color: Colors.secondary,
  },
});

export default LocationsListScreen;
