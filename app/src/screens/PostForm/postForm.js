import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  Button
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/posts';
import { LoadingModal } from '../../components';

class PostForm extends Component {

  state = {
    title: '',
    content: '',
    photo: {},
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
    const { fetching, error, errorMessage} = this.props;
    if(error) console.log(errorMessage);
    console.log(this.props.success)
    return (
      <View>
        <LoadingModal fetching={fetching} />
        <Text> Upload form </Text>
        <Image 
          style={{width: 200,height:200}} 
          source={{uri: this.state.photo.uri}}
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
const mapStateToProps = ({posts}) => ({
  fetching: posts.fetching,
  error: posts.postError,
  errorMessage: posts.postErrorMessage,
  success: posts.addSuccess,
});
const mapDispatchToProps = dispatch => ({
  addPost: form => {
    dispatch(addPost(form));
  },
})
export default connect(mapStateToProps,mapDispatchToProps)(PostForm)