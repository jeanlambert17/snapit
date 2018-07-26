import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  ToastAndroid,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/user/posts';
import { LoadingModal, TouchableImage } from '../../components';
import PreviewModal from '../../components/previewModal';
import emptyFields from '../../utils/emptyFields';

const initialState = {
  title: '',
  content: '',
  photo: {},
  modalVisible: false,
}

class PostForm extends Component {

  state = {
    ...initialState,
  }
  componentDidUpdate(prevProps) {
    if (this.props.success && !prevProps.success) {
      this.setState({
        ...initialState
      })
      this.props.navigation.navigate('Profile');
    }
    if(this.props.error && !prevProps.error) {
      this.showErrorMessage(this.props.errorMessage);
    }
  }
  componentDidMount() {  
    this.setState({
      photo: this.props.navigation.getParam('photo', null)
    });
  }
  showErrorMessage = (errorMessage) => ToastAndroid.showWithGravity(errorMessage,ToastAndroid.SHORT,ToastAndroid.BOTTOM);
  handlePhotoChange = (uri) => this.setState({ photo: { uri: uri }});
  setModalVisible = (visible) => this.setState({ modalVisible: visible });
  handleChangeText = (input) => (value) => this.setState({ [input]: value });
  handleUploadPress = () => {
    const { title, content, photo } = this.state;
    this.props.addPost({
      title,
      content,
      image: {
        uri: photo.uri,
        name: title,
        type: 'image/jpeg'
      }
    });
  }

  render() {
    const { modalVisible, photo } = this.state;
    const { fetching } = this.props;
    const disabled = emptyFields({ title: this.state.title, content: this.state.content });
    return (
      <View>
        <LoadingModal fetching={fetching} />
        <PreviewModal 
          modalVisible={modalVisible}
          setModalVisible={this.setModalVisible}
          onChangePhoto={this.handlePhotoChange}
          uri={photo.uri}
          justPreview={true}
        />
        <Text> Upload form </Text>
        <TouchableImage 
          imageStyle={{width:200,height:200}}
          uri={photo.uri}
          onPress={() => this.setModalVisible(true)}
        />
        <Text>Title</Text>
        <TextInput 
          value={this.state.title}
          onChangeText={this.handleChangeText('title')}
        />
        <Text>Content</Text>
        <TextInput
          value={this.state.content}
          onChangeText={this.handleChangeText('content')}
        />
        <Button
          title="UPLOAD"
          onPress={this.handleUploadPress}
          disabled={disabled}
        />
      </View>
    )
  }
}
PostForm.propTypes = {
  fetching: PropTypes.bool,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
}
const mapStateToProps = ({user}) => ({
  fetching: user.posts.fetching,
  error: user.posts.postError,
  errorMessage: user.posts.postErrorMessage,
  success: user.posts.addSuccess,
});
const mapDispatchToProps = dispatch => ({
  addPost: form => {
    dispatch(addPost(form));
  },
})
export default connect(mapStateToProps,mapDispatchToProps)(PostForm)