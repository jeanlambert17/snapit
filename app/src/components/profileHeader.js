import React, { Component } from 'react';
import {
  Image,
  View,
  Text,
  TouchableHighlight,
} from 'react-native';
import { ImagePicker, FileSystem } from 'expo';
import { API_URL } from '../helpers/configs';
import { connect } from 'react-redux';
import { updatePhoto } from '../actions/fields';
import styles from './Styles/profileHeader';

class ProfileHeader extends Component {
  constructor(props) {
    super(props);
  }

  getPhotosFromGallery = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      exif: true,
      allowsEditing: false,
      quality: 0.7,
      base64: false,
    })
    if (!pickerResult.cancelled) {      
      this.props.updatePhoto({
        uri: pickerResult.uri,
        name: 'profile-picture',
        type: 'image/jpeg'
      });
    }
  }

  render() {
    const { user } = this.props;
    return (
      <View style={styles.container}>
        <TouchableHighlight
          style={styles.button}
          activeOpacity={0.5} 
          onPress={this.getPhotosFromGallery} 
        >
          <Image
            style={styles.image}
            source={{uri:`${API_URL}/${user.photoUrl}`}}
          />
        </TouchableHighlight>
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