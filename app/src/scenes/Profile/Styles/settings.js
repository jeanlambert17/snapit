import {
   StyleSheet,
   Dimensions,
} from 'react-native';

const DEVICE_WIDTH = Dimensions.get('window').width;
// const DEVICE_HEIGHT = Dimensions.get('window').height;

export default StyleSheet.create({
   container: {
      alignItems: 'center',
   },
   editContainer: {
      marginTop: 15,
      flexDirection: 'row',
      alignItems: 'center',
      width: DEVICE_WIDTH * 0.85,
   },
   editInput: {
      flex:4,
   },
   editIcon: {
      marginLeft: 3,
   },
   updateButton: {
      alignSelf: 'flex-end',
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#71DDE3',
      // width: DEVICE_WIDTH * 0.20,
      height: 35,
   },
});