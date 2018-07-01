import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    textInput: {
        height: 50,
        width: Dimensions.get('window').width * 0.85,
    }
});