import React, { Component } from 'react';
import { 
  Modal, 
  StyleSheet, 
  Dimensions, 
  View,
  Image
} from 'react-native';
import {Button} from 'react-native-elements'
import { ImagePicker, Permissions } from 'expo';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

class PreviewModal extends Component {

  state = {
    hasCameraPermission: null,
  }

  async componentWillMount() {
    const result = await Permissions.askAsync(Permissions.CAMERA);
    const _result = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    if( result.status === 'granted' && _result.status === 'granted') {
      this.setState({ hasCameraPermission: true });
    } else {
      this.setState({ hasCameraPermission: false });
    }
  }

  getPhotoFromGallery = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      exif: true,
      allowsEditing: false,
      quality: 0.7,
      base64: false,
    })
    if (!pickerResult.cancelled) {
      this.props.onChangePhoto(pickerResult.uri);
    }
  }
  takePhoto = async () => {
    let pickerResult = await ImagePicker.launchCameraAsync({
      exif: true,
      allowsEditing: false,
      quality: 0.7,
      base64: true
    })
    if(!pickerResult.cancelled) {
      this.props.onChangePhoto(pickerResult.uri)
    }
  }

  render() {
    const { modalVisible, setModalVisible, uri, justPreview } = this.props;
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          alert('Modal has been closed.');
        }}>
        <View style={styles.container}>
          <Button large raised title="close" onPress={() => setModalVisible(false)} />
          <Image style={styles.image} source={{uri: uri}} />
          {(!justPreview) && (
            <View>
              <Button large raised title="Gallery" onPress={this.getPhotoFromGallery} icon={{name: 'insert-photo'}}/>
              <Button large raised title="Camera" onPress={this.props.takePhoto ? this.props.takePhoto : this.takePhoto } icon={{name: 'camera'}}/>
            </View>
          )}
          
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  image: {
    width: DEVICE_WIDTH * 0.9,
    height: DEVICE_HEIGHT * 0.75,
  }
})

export default PreviewModal