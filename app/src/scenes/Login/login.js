import React, { Component } from 'react';
import { 
    KeyboardAvoidingView,
    TouchableOpacity,
    View,
    Text,
    ProgressBarAndroid,
} from 'react-native';
import styles from './styles';
import PropTypes from 'prop-types';
import Input from '../../components/input';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
import usernameImg from '../../assets/images/username.png';
import passwordImg from '../../assets/images/password.png';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
        }
    }

    handleTextChange = (input) => (value) => this.setState({ [input]:value });
    handleLogin = () => this.props.login({ ...this.state });

    render() {
        const { fetching } = this.props;

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
            <View style={styles.options}>                
                <TouchableOpacity
                    activeOpacity={0.5}
                    style={styles.button}
                    onPress={this.handleLogin}
                >
                    { (!fetching) ? (
                        <Text style={styles.buttonText}> Login </Text>
                    ) : (
                        <ProgressBarAndroid styleAttr="Small" color="white"/>
                    )}                
                </TouchableOpacity>
                {/* <View style={styles.view}>
                    <Text style={styles.text}> Create Account </Text>
                    <Text style={styles.text}> Forgot Password </Text>
                </View> */}
            </View>
        </KeyboardAvoidingView>
        );
    }
}

Login.propTypes = {
    user: PropTypes.object,
    error: PropTypes.string,
    fetching: PropTypes.bool,
}

const mapDispatchToProps = dispatch => ({
    login: (form) => {
        dispatch(login(form))
    }   
})

const mapStateToProps = ({auth}) => ({
    user: auth.user,
    error: auth.error,
    fetching: auth.fetching,
});

export default connect(mapStateToProps,mapDispatchToProps)(Login)