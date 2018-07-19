import React, { Component } from 'react';
import { 
  Modal, 
  StyleSheet, 
  Dimensions, 
  View,
  Button,
  Image
} from 'react-native';
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
          <Button title="close" onPress={() => setModalVisible(false)} />
          <Image style={styles.image} source={{uri: uri}} />
          {(!justPreview) && (
            <View>
              <Button color="green" title="from galley" onPress={this.getPhotoFromGallery} />
              <Button color="red" title="from camera" onPress={this.props.takePhoto ? this.props.takePhoto : this.takePhoto} />
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
    height: DEVICE_HEIGHT * 0.8,
  }
})

export default PreviewModal