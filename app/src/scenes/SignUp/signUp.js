import React from 'react';
import { 
    KeyboardAvoidingView,
    TouchableOpacity,
    View,
    Text,
    ProgressBarAndroid,
    ImageBackground
} from 'react-native';
import styles from './styles';
import PropTypes from 'prop-types';
import Input from '../../components/input';
import usernameImg from '../../assets/images/username.png';
import passwordImg from '../../assets/images/password.png';
import backgroundImg from '../../assets/images/background2.png';
import emailImg from '../../assets/images/email-outline.png';
import verificationImg from '../../assets/images/lock-reset.png';

class SignUp extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            verification: '',
            email: '',
        }
    }

    handleTextChange = (input) => (value) => this.setState({ [input]: value });

    static navigationOptions = {
        headerStyle: { height: 0 }
      }
      
      render() {
        const { fetching } = this.props;
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
                            //onPress={}
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
    user: PropTypes.object,
    error: PropTypes.string,
    fetching: PropTypes.bool,
}


export default SignUp