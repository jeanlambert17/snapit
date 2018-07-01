import React, { Component } from 'react';
import { StyleSheet, Button, View } from 'react-native';

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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Home