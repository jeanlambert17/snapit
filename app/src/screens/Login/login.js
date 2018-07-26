import React, { Component } from 'react';
import { 
	KeyboardAvoidingView,
	TouchableOpacity,
	View,
	Text,
	ProgressBarAndroid,
	ImageBackground,
	ToastAndroid
} from 'react-native';
import styles from './styles';
import PropTypes from 'prop-types';
import { Input } from '../../components';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
import emptyFields from '../../utils/emptyFields';
import usernameImg from '../../assets/images/username.png';
import passwordImg from '../../assets/images/password.png';
import backgroundImg from '../../assets/images/background2.png';
// import logoImg from '../../assets/images/Logo.png';

class Login extends Component {
   
	state = {
		username: '',
    password: '',
    // disabled: true,
	}

  componentDidUpdate(prevProps) {
    if (this.props.isLoggedIn && !prevProps.isLoggedIn) {
      this.props.navigation.navigate('UserStack');
    }
    if(this.props.error && !prevProps.error) {
      this.showErrorMessage(this.props.errorMessage);
    }
  }
  handleTextChange = (input) => (value) => this.setState({[input]: value});
	handleLogin = () => this.props.login({ ...this.state });
	showErrorMessage = (errorMessage) => ToastAndroid.showWithGravity(errorMessage,ToastAndroid.SHORT,ToastAndroid.BOTTOM);

  render() {
    const { fetching, error, errorMessage, navigation } = this.props;
    // if(error) this.showErrorMessage(errorMessage);

    const disabled = emptyFields(this.state);
    return (
      <ImageBackground source={backgroundImg} style={{width: '100%', height: '100%'}}>
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
      {/* <Image source={logoImg} style={styles.logo}/> */}
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
          activeOpacity={0.1}
          style={[styles.button, disabled && {opacity: 0.5}]}
          onPress={this.handleLogin}
          disabled={disabled}
        >
          { (!fetching) ? (
              <Text style={styles.buttonText}> Login </Text>
          ) : (
              <ProgressBarAndroid styleAttr="Small" color="white"/>
          )}                
        </TouchableOpacity>
        <View style={styles.view}>
          <Text 
            style={styles.text}
            onPress={() => navigation.push('SignUp')}
          > Create Account </Text>
          <Text 
            style={styles.text}
            onPress={() => navigation.push('SignUp')}
          > Forgot Password </Text>
        </View>
      </View>         
    </KeyboardAvoidingView>
    </ImageBackground>
    );
  }
}

Login.propTypes = {
	fetching: PropTypes.bool,
	isLoggedIn: PropTypes.bool,
	login: PropTypes.func,
	error: PropTypes.bool,
	errorMessage: PropTypes.string,
}

const mapStateToProps = ({ auth }) => ({
	fetching: auth.fetching,
	isLoggedIn: auth.isLoggedIn,
	error: auth.loginError,
	errorMessage: auth.loginErrorMessage,
});
const mapDispatchToProps = dispatch => ({
	login: (form) => {
		dispatch(login(form))
	}   
});

export default connect(mapStateToProps,mapDispatchToProps)(Login)