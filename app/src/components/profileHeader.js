import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import{
  Button,
  Icon
} from 'react-native-elements';
import { ImagePicker } from 'expo';
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
    return (
      <View style={styles.container}>
        {(isOwnProfile === true) ? (
          <PreviewModal
            modalVisible={modalVisible}
            setModalVisible={this.setModalVisible}
            onChangePhoto={this.handlePhotoChange}
            uri={user.photoUrl}
          />
        ):(
          <View></View>
        )}
        <View style={{alignItems: 'center', }}>
          <TouchableImage 
            touchableHighlightStyle={styles.button}
            onPress={() => this.setModalVisible(true)}
            imageStyle={styles.image}
            uri={this.props.data ? this.props.data.user.photoUrl : user.photoUrl}
          />
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center',justifyContent: 'center'}}>
          <View style={{}}>
            <Text style={styles.title}>{this.props.data ? this.props.data.user.username : user.name}</Text>
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

const mapStateToProps = ({ auth }) => ({
  user: auth.user,
});
const mapDispatchToProps = dispatch => ({
  updatePhoto: (photo) => {
    dispatch(updatePhoto(photo));
  }
})

export default connect(mapStateToProps,mapDispatchToProps)(ProfileHeader);