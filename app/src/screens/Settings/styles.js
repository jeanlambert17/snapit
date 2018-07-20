import {
   StyleSheet,
   Dimensions,
} from 'react-native';

const DEVICE_WIDTH = Dimensions.get('window').width;
// const DEVICE_HEIGHT = Dimensions.get('window').height;

export default StyleSheet.create({
   container: {
      // alignItems: 'center',
   },
   editContainer: {
      marginTop: 10,
      flex:1,
      flexDirection: 'column',
      alignItems: 'center',
      //width: DEVICE_WIDTH * 0.85,
   },
   editInput: {
      flex:4,
   },
   editIcon: {
      marginLeft: 3,
   },
   updateButton: {
       marginTop: 5,
      justifyContent: 'center',
      height: 35,
   },
   inputContainer:{
       height: 50,
       width : DEVICE_WIDTH * 0.8,
       marginBottom: 4,
   }
});