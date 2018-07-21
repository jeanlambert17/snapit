import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Button
} from 'react-native';
import {
  ImagePicker,
  Camera,
  Permissions
} from 'expo';
import { LoadingModal } from '../../components';

class PostCamera extends Component {

  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    loading: false,
  }

  static navigationOptions = {
    header: null
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  getPhotosFromGallery = async () => {
    try {
      let pickerResult = await ImagePicker.launchImageLibraryAsync({
        exif: true,
        allowsEditing: false,
        quality: 0.5,
        base64: true
      });
      if (!pickerResult.cancelled) {
        this.props.navigation.navigate('PostForm', { photo: pickerResult });
      }
    } catch(err) {
      console.log(err);
    }
  }
  snap = async () => {
    this.setState({ loading: true });
    if (this.camera) {
      try {
        let photo = await this.camera.takePictureAsync({
          quality: 0.5,
          base64: false,
          exif: true
        });
        this.setState({ loading: false });
        if (photo) {
          this.props.navigation.navigate('PostForm', { photo: photo });
        }
      } catch(err) {
        console.log(err);
      }
    }
  }
  renderNoPermissions = () => (
    <View style={{flex:1}}>
      <Text style={{ color: 'white' }}>
        Camera permissions not granted - cannot open camera preview.
      </Text>
    </View>
  );
  renderCamera = () => (
    <Camera
      ref={ref => { this.camera = ref; }}
      style={{ flex: 1 }}
      type={this.state.type}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: 'transparent',
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          style={{
            flex: 0.1,
            alignSelf: 'flex-end',
            alignItems: 'center',
            backgroundColor: 'red'
          }}
          onPress={() => {
            this.setState({
              type: this.state.type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back,
            });
          }}>
          <Text
            style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
            {' '}Flip{' '}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flex: 0.1,
            alignSelf: 'flex-end',
            alignItems: 'center',
            backgroundColor: 'blue'
          }}
          onPress={this.snap}>
          <Text
            style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
            SNAP
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flex: 0.1,
            alignSelf: 'flex-end',
            alignItems: 'center',
            backgroundColor: 'blue'
          }}
          onPress={this.getPhotosFromGallery}>
          <Text
            style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
            FROM GALLERY
          </Text>
        </TouchableOpacity>
      </View>
    </Camera>
  );

  render() {
    const content = this.state.hasCameraPermission
      ? this.renderCamera()
      : this.renderNoPermissions()

    return (
      <View style={{ flex: 1 }}>
        {content}
      </View>
    )
  }
}

export default PostCamera;