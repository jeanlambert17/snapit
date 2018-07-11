import {
   StyleSheet,
   Dimensions,
} from 'react-native';

// const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

export default StyleSheet.create({
   header: {
      height: DEVICE_HEIGHT * 0.20,
      backgroundColor: '#F04A58',
      justifyContent: 'center',
      alignItems: 'center',
   },
   text: {
      color: 'white',
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 5,
   }
})