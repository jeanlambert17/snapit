import React, { Component } from 'react';
import {
   View,
   Text,
   TouchableOpacity,
   TouchableHighlight,
   Button,
   Modal,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateField } from '../../actions/user/fields';
import usernameImg from '../../assets/images/username.png';
// import passwordImg from '../../assets/images/password.png';
// import emailImg from '../../assets/images/email-outline.png';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Input, LoadingModal } from '../../components';
import VerificationModal from './verificationModal';
import styles from './Styles/settings';

class Settings extends Component {
  state = {
    username: '',
    email : '',
    name: '',
    password: '',
    modalVisible: false,
  }
  componentDidMount() {
    const { user } = this.props;
    this.setState({
        username: user.username,
        email: user.email,
        name: user.name,
    });
  }

  handleTextChange = (input) => (value) => this.setState({ [input]: value });
  setModalVisible = (visible) => this.setState({ modalVisible: visible });
  handleUpdateButton = () => this.setState({ modalVisible: true });

  handleUpdate = async () => {
    const { username, email, name, password } = this.state;
    this.props.updateField({
      username,
      email,
      name,
      password
    });
    this.setModalVisible(false);
  }
   
   render() {
      const { fetching, updateError, updateErrorMessage } = this.props;
      const { modalVisible, password } = this.state;
      if(updateError) {
        console.log(updateErrorMessage);
      }
      return (
        <View >            
          {/* <Header navigation={this.props.navigation} /> */}
          <VerificationModal 
            modalVisible={modalVisible} 
            setModalVisible={this.setModalVisible}
            password={password}
            handleTextChange={this.handleTextChange}
            onPressAccept={this.handleUpdate}
          />
          <LoadingModal fetching={fetching}/>
          <View>
            <View style={styles.editContainer}>
              <Input
                source={usernameImg}
                textContentType="username"
                onChangeText={this.handleTextChange('username')}                  
                value={this.state.username}
                containerStyle={styles.editInput}
              />
            </View>
            <View style={styles.editContainer}>
              <Input
                source={usernameImg}
                textContentType="name"
                onChangeText={this.handleTextChange('name')}
                value={this.state.name}
                containerStyle={styles.editInput}
              />
            </View>
            <View style={styles.editContainer}>
              <Input
                source={usernameImg}
                textContentType="email"
                onChangeText={this.handleTextChange('email')}
                value={this.state.email}
                containerStyle={styles.editInput}
              />
            </View>
            <Button
              title="UPDATE"
              color="#F04A58"
              onPress={this.handleUpdateButton}
            />
          </View>
        </View>
      )
   }
}

Settings.propTypes = {
  user: PropTypes.object,
  fetching: PropTypes.bool,
  updateError: PropTypes.bool,
  updateErrorMessage: PropTypes.string,
}

// const mapStateToProps = ({auth, fields}) => ({
//   user: auth.user,
//   fetching: fields.fetching,
//   updateError: fields.updateError,
//   updateErrorMessage: fields.updateErrorMessage,
// });
// const mapDispatchToProps = dispatch => ({
//   updateField: (form) => {
//     dispatch(updateField(form));
//   }
// });
const mapStateToProps = ({auth, user}) => ({
  user: auth.user,
  fetching: user.fields.fetching,
  updateError: user.fields.updateError,
  updateErrorMessage: user.fields.updateErrorMessage,
});
const mapDispatchToProps = dispatch => ({
  updateField: (form) => {
    dispatch(updateField(form));
  }
});

export default connect(mapStateToProps,mapDispatchToProps)(Settings)