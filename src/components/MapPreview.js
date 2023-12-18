// @packages
import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
// @scripts
import {GOOGLE_API_KEY} from "@env";

const MapPreview = (props) => { 
  let imagePreviewUrl;
  if (props.location) {
    imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${props.location.latitude},${props.location.longitude}&zoom=14&size=400x400&maptype=roadmap&markers=color:red%7Clabel:A%7C${props.location.latitude},${props.location.longitude}&key=${GOOGLE_API_KEY}`;
  }

  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{ ...styles.mapPreview, ...props.style }}
    >
      {props.location ? (
        <Image style={styles.mapImage} source={{ uri: imagePreviewUrl }} />
      ) : (
        props.children
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mapImage: {
    height: '100%',
    width: '100%',
  },
  mapPreview: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MapPreview;
