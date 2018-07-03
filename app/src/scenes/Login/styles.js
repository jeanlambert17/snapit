import { StyleSheet, Dimensions } from 'react-native';

const DEVICE_WIDTH = Dimensions.get('window').width;
// const DEVICE_HEIGHT = Dimensions.get('window').height;

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    input: {
        marginTop: 5,
        marginBottom: 5,
    },
    options: {
        marginTop: 10,
    },
    button: {
        borderRadius: 35,        
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#71DDE3',
        width: DEVICE_WIDTH * 0.85,
        height: 40,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        // letterSpacing: 4,
    },
    view: {
        marginTop: 10,
        width: DEVICE_WIDTH * 0.85,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    text: {
        fontSize: 10,
        backgroundColor:'transparent',
    }
});