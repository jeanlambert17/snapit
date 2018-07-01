import React from 'react';
import {
    View,
} from 'react-native';
import styles from './styles';

class SignUp extends React.Component {

    handleTextChange = (input) => (event) => this.setState({ [input]: event.value });

    render() {
        return (
            <View style={styles.container}>
                
            </View>
        );
    }
}

export default SignUp