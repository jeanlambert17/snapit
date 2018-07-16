import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
		KeyboardAvoidingView,
		TouchableOpacity,
		View,
		Text,
		ProgressBarAndroid,
		ImageBackground,
		ToastAndroid
} from 'react-native';

import usernameImg from '../../assets/images/username.png';
import passwordImg from '../../assets/images/password.png';
import backgroundImg from '../../assets/images/background2.png';
import emailImg from '../../assets/images/email-outline.png';
import verificationImg from '../../assets/images/lock-reset.png';

import { connect } from 'react-redux';
import { signUp } from '../../actions/auth';
import { Input } from '../../components';
import styles from './styles';

class SignUp extends React.Component {
	 state = {
			username: '',
			name: '',
			password: '',
			verification: '',
			email: '',
	 }

	 componentDidUpdate(prevProps) {
			if (this.props.signUpRedirect && !prevProps.signUpRedirect) {
				 this.props.navigation.navigate('Login');
			}
	 }
	showErrorMessage = (errorMessage) => ToastAndroid.showWithGravity(errorMessage, ToastAndroid.BOTTOM, ToastAndroid.SHORT);
	handleTextChange = (input) => (value) => this.setState({ [input]: value });
	handleSignUp = () => {
		const { password, verification } = this.state;
		if(password === verification) {
			this.props.signUp({...this.state});
		} else {
			this.showErrorMessage('Mismatch')
		}
	}

	render() {
		const { fetching, error, errorMessage } = this.props

		if(error) this.showErrorMessage(errorMessage);
		return (
				<ImageBackground source={backgroundImg} style={{width: '100%', height: '100%'}} blurRadius={1.5}>
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
								source={usernameImg}
								textContentType="name"
								placeholder="Name"
								placeholderTextColor="white"
								onChangeText={this.handleTextChange('name')}
								value={this.state.name}
								containerStyle={styles.input}
								autoCapitalize="words"
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
							<Input
								source={verificationImg}
								textContentType="password"
								placeholder="Confirm Password"
								placeholderTextColor="white"
								onChangeText={this.handleTextChange('verification')}
								value={this.state.verification}
								secureTextEntry={true}
								containerStyle={styles.input}
							/>
							<Input
								source={emailImg}
								textContentType="emailAddress"
								placeholder="Email@example.com"
								placeholderTextColor="white"
								onChangeText={this.handleTextChange('email')}
								value={this.state.email}
								containerStyle={styles.input}
							/>
							<View style={styles.div}>
								<TouchableOpacity
											activeOpacity={0.5}
											style={styles.button}
											onPress={this.handleSignUp}
								>
											{ (!fetching) ? (
													<Text style={styles.buttonText}> Register </Text>
											) : (
													<ProgressBarAndroid styleAttr="Small" color="white"/>
											)}
								</TouchableOpacity>
							</View>
					</KeyboardAvoidingView>
				</ImageBackground>
		);
	}
}

SignUp.propTypes = {
	fetching: PropTypes.bool,
	signUp: PropTypes.func,
	signUpRedirect: PropTypes.bool,
	error: PropTypes.bool,
	errorMessage: PropTypes.string,
}

const mapStateToProps = ({auth}) => ({
	signUpRedirect: auth.signUpRedirect,
	error: auth.signUpError,
	errorMessage: auth.signUpErrorMessage,
	fetching: auth.fetching,
});

const mapDispatchToProps = dispatch => ({
	signUp: (form) => {
		dispatch(signUp(form));
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)