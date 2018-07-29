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
    try {
      let pickerResult = await ImagePicker.launchImageLibraryAsync({
        exif: true,
        allowsEditing: false,
        quality: 0.7,
        base64: false,
      })
      if (!pickerResult.cancelled) {
        this.props.onChangePhoto(pickerResult.uri);
      }
    } catch(err) {
      // Handle err
      console.log(err);
    }
  }
  takePhoto = async () => {
    try {
      let pickerResult = await ImagePicker.launchCameraAsync({
        exif: true,
        allowsEditing: false,
        quality: 0.7,
        base64: true
      })
      if (!pickerResult.cancelled) {
        this.props.onChangePhoto(pickerResult.uri)
      }
    } catch(err) {
      // Handle err
      console.log(err);
    }
  }

  render() {
    const { modalVisible, setModalVisible, uri, justPreview } = this.props;
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.container}>
          <View style={{paddingLeft: DEVICE_WIDTH*0.05}}>
            <Image style={styles.image} source={{uri: uri}}/>
          </View>
          {(!justPreview) ? (
            <View style={{flexDirection: 'row', backgroundColor: 'gray'}}>
              <Button containerViewStyle={{flex: 0.5, margin: 0, padding: 0}} title="Camera" onPress={this.props.takePhoto ? this.props.takePhoto : this.takePhoto } icon={{name: 'camera'}} backgroundColor='#F04A58'/>
              <Button containerViewStyle={{flex: 0.5, margin: 0, padding: 0}} title="Gallery" onPress={this.getPhotoFromGallery} icon={{ name: 'insert-photo' }} backgroundColor='#F04A58' />
            </View>          
          ) : (
            <View>
              <Button containerViewStyle={{margin: 0, padding: 0}} title="Gallery" onPress={this.getPhotoFromGallery} icon={{ name: 'insert-photo' }} backgroundColor='#F04A58' />
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
    width: DEVICE_WIDTH * 0.90,
    height: DEVICE_HEIGHT * 0.90,
  }
})

export default PreviewModal