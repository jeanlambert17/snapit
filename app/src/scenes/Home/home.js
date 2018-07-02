import React, { Component } from 'react';
import { Button, View } from 'react-native';
import styles from './styles';

class Home extends Component {
    
    handlePress = route => () => {
        return this.props.navigation.push(route);
    }

    render() {
        return (
            <View style={styles.container}>
                <Button
                    title="GO TO LOGIN"
                    onPress={this.handlePress('Login')}
                ></Button>
                <Button
                    title="GO TO SIGN UP"
                    onPress={this.handlePress('SignUp')}
                ></Button>
            </View>
        );
    }
}

export default Home