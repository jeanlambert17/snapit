import { StyleSheet, Dimensions } from 'react-native';

const DEVICE_WIDTH = Dimensions.get('window').width;
// const DEVICE_HEIGHT = Dimensions.get('window').height;

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        borderRadius: 25,
        marginTop: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0396A6',
        width: DEVICE_WIDTH * 0.85,
        height: 35,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        // letterSpacing: 4,
    },
    input: {
        marginTop: 5,
        marginBottom: 5,
    },
});