import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Button
} from 'react-native';
import { Icon } from 'react-native-elements';
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
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity
          style={{
            alignSelf: 'flex-end',
          }}
          onPress={() => {
            this.setState({
              type: this.state.type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back,
            });
          }}>
           <Icon
            reverse
            name='ios-reverse-camera'
            type='ionicon'
            color='gray'
           />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            alignSelf: 'flex-end',
          }}
          onPress={this.snap}>
          <Icon 
            reverse
            name='ios-camera'
            type='ionicon'
            color='#F04A58'
            size={35}/>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            alignSelf: 'flex-end',
          }}
          onPress={this.getPhotosFromGallery}>
          <Icon 
            reverse
            name='md-images'
            type='ionicon'
            color='gray'/>
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