import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';
import { ImagePicker } from 'expo';
import { API_URL } from '../helpers/configs';
import { connect } from 'react-redux';
import { updatePhoto } from '../actions/user/fields';
import styles from './Styles/profileHeader';
import PreviewModal from './previewModal';
import TouchableImage from './touchableImage';

class ProfileHeader extends Component {
  state = {
    modalVisible: false,
  }
  setModalVisible = (visible) => this.setState({ modalVisible: visible });
  handlePhotoChange = (uri) => {
    this.props.updatePhoto({
      uri: uri,
      name: 'profile-picture',
      type: 'image/jpeg',
    });
  }
  getPhotosFromGallery = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      exif: true,
      allowsEditing: false,
      quality: 0.7,
      base64: false,
    })
    if (!pickerResult.cancelled) {      
      this.handlePhotoChange(pickerResult.uri);
    }
  }

  render() {
    const { user } = this.props;
    const { modalVisible } = this.state;
    return (
      <View style={styles.container}>
        <PreviewModal
          modalVisible={modalVisible}
          setModalVisible={this.setModalVisible}
          onChangePhoto={this.handlePhotoChange}
          uri={`${API_URL}/${user.photoUrl}`}
        />
        <TouchableImage 
          touchableHighlightStyle={styles.button}
          onPress={() => this.setModalVisible(true)}
          imageStyle={styles.image}
          uri={`${API_URL}/${user.photoUrl}`}
        />
        <Text style={styles.title}>
          {user.name}
        </Text>
      </View>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  user: auth.user,
});
const mapDispatchToProps = dispatch => ({
  updatePhoto: (photo) => {
    dispatch(updatePhoto(photo));
  }
})

export default connect(mapStateToProps,mapDispatchToProps)(ProfileHeader);