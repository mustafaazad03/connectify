// @packages
import React, { useCallback, useEffect, useState } from 'react';
import {
  Alert,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useDispatch } from 'react-redux';
//@ scripts
import Colors from '../constants/Colors';
import ImageSelector from '../components/ImageSelector';
import * as locationsActions from '../store/actions/locations-actions';
import LocationSelector from '../components/LocationSelector';
import OutlinedButton from '../components/UI/OutlinedButton';

const NewLocationScreen = (props) => {
  const [titleError, setTitleError] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [locationError, setLocationError] = useState(false);
  const [titleValue, setTitleValue] = useState('');
  const [selectedImage, setSelectedImage] = useState();
  const [selectedLocation, setSelectedLocation] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    if (titleError) {
      setTitleError(false);
      Alert.alert('Please enter a title');
      return;
    }
    if (imageError) {
      setImageError(false);
      Alert.alert('Please provide an image for the location');
      return;
    }
    if (locationError) {
      setLocationError(false);
      Alert.alert('No location chosen yet');
      return;
    }

  }, [titleError, imageError, locationError]);

  const imageTakenHandler = (imagePath) => {
    setSelectedImage(imagePath);
  };

  const locationSelectedHandler = useCallback((location) => {
    setSelectedLocation(location);
  }, []);

  const saveLocationHandler = () => {
    if (titleValue.length < 1) {
      setTitleError(true);
    } 
    else if (!selectedImage) {
      setImageError(true);
    }
    else if (!selectedLocation) {
      setLocationError(true);
    }
    else {
      dispatch(
        locationsActions.addLocation(
          titleValue,
          selectedImage,
          selectedLocation
        )
      );
      props.navigation.goBack();
    }
  };

  const titleChangeHandler = (text) => {
    setTitleValue(text);
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: Colors.backgroundColor }}>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput style={styles.textInput} onChangeText={titleChangeHandler} />
        <ImageSelector onImageTaken={imageTakenHandler} />
        <LocationSelector
          navigation={props.navigation}
          onLocationChosen={locationSelectedHandler}
        />
        <OutlinedButton
          icon="save-outline"
          onPress={saveLocationHandler}
          value={titleValue}
        >Save Location</OutlinedButton>
      </View>
    </ScrollView>
  );
};

NewLocationScreen.navigationOptions = {
  headerTitle: 'Add Location',
};

const styles = StyleSheet.create({
  button: {
    marginTop: 25,
  },
  form: {
    margin: 23,
  },
  label: {
    color: Colors.text,
    fontSize: 19,
    marginBottom: 8,
  },
  textInput: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    color: Colors.text,
    fontSize: 17,
    marginBottom: 15,
    paddingHorizontal: 2,
    paddingVertical: 4,
  },
});

export default NewLocationScreen;
