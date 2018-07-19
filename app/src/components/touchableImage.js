import React from 'react';
import {
  View,
  Image,
  TouchableHighlight
} from 'react-native';
// import styles from './Styles/touchableImage';

const TouchableImage = (props) => {
  console.log(props)
  return (
  <TouchableHighlight
    style={props.touchableHighlightStyle}
    activeOpacity={0.5}
    onPress={props.onPress}
  >
    <Image
      style={props.imageStyle}
      source={{ uri: props.uri }}
    />
  </TouchableHighlight>
)};

export default TouchableImage;