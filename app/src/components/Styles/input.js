import {
   StyleSheet,
   // Dimensions
} from 'react-native';

// const DEVICE_WIDTH = Dimensions.get('window').width;
// const DEVICE_HEIGHT = Dimensions.get('window').height;

export default StyleSheet.create({
   container: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#D9D9D3',
      opacity: 0.5,
      borderRadius: 30,
      height: 50,
   },
   input: {
      flex: 1,
      fontSize: 20
   },
   icon: {
      height: 22,
      width: 22,
      marginLeft: 15,
      marginRight: 10,
      marginTop: 10,
      marginBottom: 10,
   }
});
