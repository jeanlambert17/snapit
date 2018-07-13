import {
   StyleSheet,
   Dimensions
} from 'react-native';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

export default StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: "rgba(0,0,0,0.8)",
      // opacity: 0.6,
   },
   modal: {
      zIndex:100,
      width: DEVICE_WIDTH * 0.90,
      height: DEVICE_HEIGHT * 0.25,
      backgroundColor: 'white',
   },
})