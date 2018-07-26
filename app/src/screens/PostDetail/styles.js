import { 
  StyleSheet, 
  Dimensions 
} from 'react-native';

const DEVICE_WIDTH = Dimensions.get('window').width;
// const DEVICE_HEIGHT = Dimensions.get('window').height;

export default StyleSheet.create({
  container: {
    backgroundColor: '#efefef'
  },
  details: {
    borderBottomColor: 'gray', 
    borderBottomWidth: 1, 
    marginBottom: 10, 
    marginHorizontal: 10
  },
  title: {
    fontSize: 20, 
    fontWeight: 'bold'
  },
  subtitle: {
    flexDirection: 'row', 
    justifyContent: 'flex-end'
  },
  date: {
    fontSize: 10, color: 'gray',
  },
  content: {
    marginVertical: 15
  },
  info: {
    flexDirection: 'row', 
    justifyContent: 'space-between'
  },
  likesCount: {
    color: 'gray', 
    marginVertical: 10
  },
  commentButton: {
    height: 20, 
    paddingRight: 5
  },
  commentText: {
    fontSize: 14, 
    color: 'gray'
  },
});