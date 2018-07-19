import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  Button,
  TouchableHighlight
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/user/posts';
import { LoadingModal, TouchableImage } from '../../components';
import PreviewModal from '../../components/previewModal';

class PostForm extends Component {

  state = {
    title: '',
    content: '',
    photo: {},
    modalVisible: false,
  }
  componentDidUpdate(prevProps) {
    if(!prevProps.success && this.props.success) {
      this.props.navigation.pop();
    }
  }
  componentDidMount() {  
    this.setState({
      photo: this.props.navigation.getParam('photo', null)
    });
  }
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
    const { fetching, error, errorMessage } = this.props;
    if(error) console.log(errorMessage);
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
        {/* <TouchableHighlight
          activeOpacity={0.5}
          onPress={() => this.setModalVisible(true)}
        >
          <Image
            style={{width: 200,height:200}}
            source={{ uri: photo.uri }}
          />
        </TouchableHighlight> */}
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