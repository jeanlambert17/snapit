import React from 'react';
import { 
    TextInput, 
    View,
    TouchableOpacity,
    Text,
} from 'react-native';
import styles from './styles';
import Input from '../../components/input';
import Icon from 'react-native-vector-icons/MaterialIcons'
import usernameImg from '../../assets/images/username.png';
import passwordImg from '../../assets/images/password.png';

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
        }
    }

    handleTextChange = (input) => (value) => this.setState({ [input]:value });
    
    handleLogin() {

    }

    render() {
        return (
        <View style={styles.container}>
            <Input
                source={usernameImg}
                textContentType="username"
                placeholder="Username"
                placeholderTextColor="white"
                onChangeText={this.handleTextChange('username')}
                value={this.state.username}
                containerStyle={styles.input}
            />
            <Input
                source={passwordImg}
                textContentType="password"
                placeholder="Password"
                placeholderTextColor="white"
                onChangeText={this.handleTextChange('password')}
                value={this.state.password}
                secureTextEntry={true}
                containerStyle={styles.input}
            />
            <TouchableOpacity
                activeOpacity={0.5}
                style={styles.button}
                onPress={this.handleLogin}
            >
                <Text style={styles.buttonText}> LOGIN </Text>
            </TouchableOpacity>
        </View>
        );
    }
}

export default Login