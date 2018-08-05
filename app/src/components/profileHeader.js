import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import{ Icon } from 'react-native-elements';
import { ImagePicker } from 'expo';
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
    try {
      let pickerResult = await ImagePicker.launchImageLibraryAsync({
        exif: true,
        allowsEditing: false,
        quality: 0.7,
        base64: false,
      })
      if (!pickerResult.cancelled) {
        this.handlePhotoChange(pickerResult.uri);
      }
    } catch(err) {
      // Handle err
      console.log(err);
    }
  }
  render() {
    const { isOwnProfile, user } = this.props;
    const { modalVisible } = this.state;
    console.log('profile header user: ' + user)
    return (
      <View style={styles.container}>
        <PreviewModal
          justPreview={!isOwnProfile}
          modalVisible={modalVisible}
          setModalVisible={this.setModalVisible}
          onChangePhoto={this.handlePhotoChange}
          uri={user.photoUrl}
        />
        <View style={{alignItems: 'center', }}>
          <TouchableImage 
            touchableHighlightStyle={styles.button}
            onPress={() => this.setModalVisible(true)}
            imageStyle={styles.image}
            uri={user.photoUrl}
          />
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center',justifyContent: 'center'}}>
          <View style={{}}>
            <Text style={styles.title}>{user.name ? user.name : user.username}</Text>
          </View>
          {(isOwnProfile === true) ? (
            <TouchableOpacity
            style={{position: 'absolute', right: 5, bottom: 0}}
              onPress={() => this.props.toSettings()}>
              <Icon name='settings'
                color='white'/>
            </TouchableOpacity>
          ):(
            <View></View>
          )}
        </View>
      </View>
    );
  }
}

// export default connect(mapStateToProps,mapDispatchToProps)(ProfileHeader);
export default ProfileHeader