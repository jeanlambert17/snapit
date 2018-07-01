import React from 'react';
import { 
    TextInput, 
    View,
} from 'react-native';
import styles from './styles';

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
        }
    }

    handleTextChange = (input) => (event) => this.setState({ [input] : event.value });

    render() {
        return (
        <View style={styles.container}>
            <TextInput
                textContentType="username"
                placeholder="Username"
                placeholderTextColor="#71DDE3"
                style={styles.textInput}
                onChangeText={this.handleTextChange('username')}
                value={this.state.username}
            />
            <TextInput
                textContentType="password"
                placeholder="Password"
                placeholderTextColor="#71DDE3"
                style={styles.textInput}
                onChangeText={this.handleTextChange('password')}
                value={this.state.password}
            />
        </View>
        );
    }
}

export default Login