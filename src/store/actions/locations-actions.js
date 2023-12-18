// @packages
import * as FileSystem from 'expo-file-system';
// @scripts
export const ADD_LOCATION = 'ADD_LOCATION';
export const SET_LOCATIONS = 'SET_LOCATIONS';
export const REMOVE_LOCATION = 'REMOVE_LOCATION';
import {
  fetchLocations,
  insertLocation,
  deleteLocation,
} from '../../helpers/db';
import {GOOGLE_API_KEY} from "@env";

export const addLocation = (title, image, location) => {
  return async (dispatch) => {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.latitude},${location.longitude}&key=${GOOGLE_API_KEY}`
    );
    if (!response.ok)
      throw new Error('Something went wrong getting the address from the API!');

    const resData = await response.json();
    if (!resData.results) {
      throw new Error('The address result is missing from the API!');
    }
    // console.log("Response Data: ", resData);
    const address = resData.results[0].formatted_address;
    console.log('Address:', resData.results[0].formatted_address);

    const fileName = image.split('/').pop();
    const newPath = FileSystem.documentDirectory + fileName;

    try {
      await FileSystem.moveAsync({
        from: image,
        to: newPath,
      });
      const dbResult = await insertLocation(
        title,
        newPath,
        address,
        location.latitude,
        location.longitude
      );
      console.log(dbResult);
      dispatch({
        type: ADD_LOCATION,
        locationData: {
          id: dbResult.insertId,
          title: title,
          image: newPath,
          address: address,
          coords: {
            lat: location.latitude,
            lng: location.longitude,
          },
        },
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};

export const loadLocations = () => {
  return async (dispatch) => {
    try {
      const dbResult = await fetchLocations();
      // console.log(dbResult);
      dispatch({ type: SET_LOCATIONS, locations: dbResult.rows._array });
    } catch (err) {
      throw err;
    }
  };
};

export const removeLocation = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: REMOVE_LOCATION, locationId: id });
      const dBResult = await deleteLocation(id);
    } catch (err) {
      throw err;
    }
  };
};
