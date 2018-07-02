import React from 'react';
import { 
    KeyboardAvoidingView, 
    View,
    TouchableOpacity,
    Text,
} from 'react-native';
import styles from './styles';
import Input from '../../components/input';
import { connect } from 'react-redux';
import { doLogin } from '../../actions/user';
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
        // Esto esta embrujado. 
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
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
                <Text style={styles.buttonText}> LOGIN {this.props.user}</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        login: (form) => {
            dispatch(doLogin(form))
        }
    }
}

const mapStateToProps = state => ({
    user: state.auth.user,
});

export default connect(mapStateToProps,mapDispatchToProps)(Login)