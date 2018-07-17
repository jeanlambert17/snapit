import { StyleSheet, Dimensions } from 'react-native';

const DEVICE_WIDTH = Dimensions.get('window').width;

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
        marginTop: 5,
        marginBottom: 5,
        width: DEVICE_WIDTH*0.85,
    },
    div: {
        marginTop: 10,
    }, 
    button: {
        borderRadius: 15,        
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
    }
});