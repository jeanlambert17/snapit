import React, { Component } from 'react';
import {
  View,
  Button,
  Image,
  Text
} from 'react-native';
import { API_URL } from '../../helpers/configs';

class PostDetail extends Component {

  state = {
    post: {},
  }

  componentDidMount() {
    this.setState({
      post: this.props.navigation.getParam('post', null)
    });
  }
  render() {
    console.log(this.state.post.imageUrl)
    return (
      <View>
        <Text>{this.state.post.title}</Text>
        <Image style={{width: 100, height: 100}}source={{uri:`${API_URL}/${this.state.post.imageUrl}`}}/>
      </View>
    )
  }
}

export default PostDetail;