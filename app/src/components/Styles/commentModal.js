import {
  StyleSheet,
  Dimensions,
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default StyleSheet.create({
  containerStyle: {
    position: 'absolute', 
    bottom: 5, 
    backgroundColor: '#f2f2f2', 
    width: SCREEN_WIDTH
  },
  commentText: {
    fontSize: 12
  },
  container: { 
    flexDirection: 'row'
  },
  textInput: {
    flex:0.9
  },
  options: {
    flex: 0.1, 
    marginRight: 5
  }
})