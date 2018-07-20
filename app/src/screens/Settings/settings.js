import React, { Component } from 'react';
import {
  View,
} from 'react-native';
import {  Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { updateField } from '../../actions/user/fields';
import usernameImg from '../../assets/images/username.png';
import emailoutline from '../../assets/images/email-outline.png';
import { Input } from '../../components';
import { VerificationModal, LoadingModal } from '../../components';
import styles from './styles';

class Settings extends Component {
  state = {
    username: '',
    email: '',
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
    this.props.updateField({ username, email, name, password });
    this.setState({
      password: '',
      modalVisible: false,
    })
  }

  render() {
    const { user } = this.props;
    const { modalVisible, password } = this.state;
    return (
      <View >
        <VerificationModal
          modalVisible={modalVisible}
          setModalVisible={this.setModalVisible}
          password={password}
          handleTextChange={this.handleTextChange}
          onPressAccept={this.handleUpdate}
        />
        <LoadingModal fetching={this.props.fetching} />
        <View style={styles.editContainer}>
          <View style={styles.inputContainer}>
            <Input
              source={usernameImg}
              textContentType="username"
              placeholder="username"
              onChangeText={this.handleTextChange('username')}
              value={this.state.username}
              containerStyle={styles.editInput}
            />
          </View>
          <View style={styles.inputContainer}>
            <Input
              source={usernameImg}
              textContentType="name"
              placeholder="name"
              onChangeText={this.handleTextChange('name')}
              value={this.state.name}
              containerStyle={styles.editInput}
            />
          </View>
          <View style={styles.inputContainer}>
            <Input
              source={emailoutline}
              textContentType="email"
              placeholder="Email"
              onChangeText={this.handleTextChange('email')}
              value={this.state.email}
              containerStyle={styles.editInput}
            />
          </View>
          <View style={styles.updateButton}>
              <Button
                borderRadius={5}
                raised
                title="UPDATE"
                backgroundColor="#F04A58"
                onPress={this.handleUpdateButton}
              />
          </View>
        </View>
      </View>
    )
  }
}

const mapStateToProps = ({ auth, user }) => ({
  user: auth.user,
  fetching: user.fields.fetching,
});
const mapDispatchToProps = dispatch => ({
  updateField: (form) => {
    dispatch(updateField(form));
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(Settings)