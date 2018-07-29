import React, { Component } from 'react';
import {
   StyleSheet,
  //  Dimensions
} from 'react-native';

// const DEVICE_WIDTH = Dimensions.get('window').width;
// const DEVICE_HEIGHT = Dimensions.get('window').height;

export default StyleSheet.create({
   container: {
      flex: 1, 
      marginTop: 5
   },
   button: {
      borderRadius: 80 
   },
   image: {
      width: 80, 
      height: 80, 
      borderRadius: 80 
   },
   title: {
      marginTop: 10, 
      color: 'white', 
      fontWeight: 'bold', 
      fontSize: 20,
      justifyContent: 'center'
   },
})