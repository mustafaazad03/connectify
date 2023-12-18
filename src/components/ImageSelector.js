// @packages
import {
  Alert,
  Button,
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
// @scripts
import Colors from '../constants/Colors';
import OutlinedButton from './UI/OutlinedButton';

const ImageSelector = (props) => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(
      Permissions.CAMERA,
      Permissions.MEDIA_LIBRARY
    );
    if (result.status !== 'granted') {
      Alert.alert(
        'Insufficient permissions',
        'Sorry, you need to grant the reqiuired permissions to use this app',
        [{ text: 'Okay' }]
      );
      return false;
    }
    return true;
  };

  const pickImage = async () => {
    const permission = await verifyPermissions();
    if (!permission) return;
    let image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, //explore, else change to .Images
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });
    if (!image.cancelled) {
      setImage(image.uri);
      props.onImageTaken(image.uri);
    }
  };

  const takeImage = async () => {
    const permission = await verifyPermissions();
    if (!permission) return;
    let image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });
    setImage(image.uri);
    props.onImageTaken(image.uri);
  };

  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        {!image ? (
          <Text style={{ color: Colors.text }}>No image selected yet</Text>
        ) : (
          <Image style={styles.image} source={{ uri: image }} />
        )}
      </View>
      <View style={styles.buttonStyleContainer}>
        <OutlinedButton
          icon="camera"
          onPress={takeImage}
        >Take Photo</OutlinedButton>
        <OutlinedButton
          icon="images-outline"
          onPress={pickImage}
        >Select Image</OutlinedButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonStyleContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  imagePicker: {
    alignItems: 'center',
    marginBottom: 10,
  },
  imagePreview: {
    width: 200,
    height: 200,
    borderRadius: 200 / 2,
    marginTop: 7,
    marginBottom: 7,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 0.75,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 225 / 2,
    resizeMode: 'cover',
  },
});

export default ImageSelector;
