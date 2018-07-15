import { StyleSheet, Dimensions } from 'react-native';
import backgroundImg from '../../assets/images/background2.png';


const DEVICE_WIDTH = Dimensions.get('window').width;
// const DEVICE_HEIGHT = Dimensions.get('window').height;

export default StyleSheet.create({
    container: {
        flex: 1,
        //backgroundImage: backgroundImg,
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
        marginTop: 5,
        marginBottom: 5,
        width: DEVICE_WIDTH*0.85,
    },
    options: {
        marginTop: 10,
        alignItems: 'center',
    },
    button: {
        borderRadius: 30,        
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F04A58',
        width: DEVICE_WIDTH * 0.85,
        height: 45,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20
    },
    view: {
        marginTop: 10,
        width: DEVICE_WIDTH * 0.80,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    text: {
        fontSize: 15,
        backgroundColor:'transparent',
    },
    backgroundImage: {
        resizeMode: 'stretch'
    },
    logo:{
        width: 200,
        height: 200,
        marginTop: 100
        //marginBottom: 15
    }
});