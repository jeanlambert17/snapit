import { 
  StyleSheet,
  Dimensions, 
} from 'react-native';

export default StyleSheet.create({
  card: { 
    width: 50, 
    height: 50 
  },
  container: { 
    flexDirection: 'row', 
    borderBottomWidth: 1, 
    borderBottomColor: '#F04A58' 
  },
  titleWrap: { 
    marginVertical: 2 
  },
  title: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    marginLeft: 10 
  },
  image: { 
    width: 300, 
    height: 300, 
    justifyContent: 'center', 
    marginTop: 5
  },
  footer: { 
    marginVertical: 8
  },
  buttonsWrap: { 
    flexDirection: 'row', 
    marginVertical: 3 
  },
  username: { 
    fontSize: 14, 
    fontWeight: "bold" 
  },
  content: { 
    fontSize: 12, 
    color: '#474747', 
    marginBottom: 10,
    marginLeft: 10 
  },
})